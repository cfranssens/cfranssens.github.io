use wasm_bindgen::prelude::*;

use winit::event::{Event, WindowEvent};
use winit::event_loop::{ControlFlow, EventLoop};
use winit::window::{Window, WindowBuilder};

mod utils;

struct State { // Struct for handling window, device, rendering and other shit, NOT the main engine. Basically the rendering backend
    surface: wgpu::Surface,
    device: wgpu::Device,
    queue: wgpu::Queue,
    window: Window,
    config: wgpu::SurfaceConfiguration,
    size: winit::dpi::PhysicalSize<u32>,
}

impl State {
    async fn new(window: Window) -> State {
        let size: winit::dpi::PhysicalSize<u32> = window.inner_size(); // Get the size of the window to link to

        // Create an instance supporting all backends, and default shader compilation
        let instance: wgpu::Instance = wgpu::Instance::new(wgpu::InstanceDescriptor {backends: wgpu::Backends::all(), dx12_shader_compiler: Default::default()});
        let surface: wgpu::Surface = unsafe {instance.create_surface(&window)}.unwrap(); // surface should live as long as window because they're part of the same struct
        // Create adapter, a link to the actual GPU
        let adapter: wgpu::Adapter = instance.request_adapter(&wgpu::RequestAdapterOptions {power_preference: wgpu::PowerPreference::HighPerformance, force_fallback_adapter: false, compatible_surface: Some(&surface)}).await.unwrap();


        // Create Device and Queue (I have no idea what a queue does
        let (device, queue): (wgpu::Device, wgpu::Queue) = adapter.request_device(&wgpu::DeviceDescriptor {
            features: wgpu::Features::empty(),
            limits: wgpu::Limits::downlevel_webgl2_defaults(),
            label: None
        },
        None
        ).await.unwrap();

        let surface_caps: wgpu::SurfaceCapabilities = surface.get_capabilities(&adapter);
        let surface_format = surface_caps.formats.iter().copied().find(|f| f.is_srgb()).unwrap_or(surface_caps.formats[0]);
        let config = wgpu::SurfaceConfiguration {
            usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
            format: surface_format,
            width: size.width,
            height: size.height,
            present_mode: surface_caps.present_modes[0],
            alpha_mode: surface_caps.alpha_modes[0],
            view_formats: vec![],
        };
        surface.configure(&device, &config);

        Self {
            size,
            surface,
            config,
            window,

            device,
            queue
        }
    }

    pub fn resize(&mut self, new_size: winit::dpi::PhysicalSize<u32>) {
        if new_size.width > 0 && new_size.height > 0 {
            self.size = new_size;
            self.config.width = new_size.width;
            self.config.height = new_size.height;
            self.surface.configure(&self.device, &self.config);
        }
    }

    fn render(&mut self) -> Result<(), wgpu::SurfaceError> {
        let output: wgpu::SurfaceTexture = self.surface.get_current_texture()?;
        let view: wgpu::TextureView = output.texture.create_view(&wgpu::TextureViewDescriptor::default());

        let mut encoder: wgpu::CommandEncoder = self.device.create_command_encoder(&wgpu::CommandEncoderDescriptor {label: Some("Render encoder")});

        let mut render_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
            label: Some("Render pass"),
            color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                view: &view,
                resolve_target: None,
                ops: wgpu::Operations {
                    load: wgpu::LoadOp::Clear(wgpu::Color {
                        r: 0.1,
                        g: 0.2,
                        b: 0.3,
                        a: 1.0
                    }),
                    store: true
                }
            })],
            depth_stencil_attachment: None
        });

        drop(render_pass);
        self.queue.submit(std::iter::once(encoder.finish()));
        output.present();

        Ok(())
    }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen(start))]
pub async fn run() {
    cfg_if::cfg_if! {
        if #[cfg(target_arch = "wasm32")] {
            std::panic::set_hook(Box::new(console_error_panic_hook::hook));
            console_log::init_with_level(log::Level::Warn).expect("Couldn't initialize logger");
        } else {
            env_logger::init();
        }
    }

    let event_loop = EventLoop::new();
    let window: Window = WindowBuilder::new().build(&event_loop).unwrap();

    #[cfg(target_arch = "wasm32")]
    {
        window.set_inner_size(winit::dpi::PhysicalSize::new(1600, 900));

        use winit::platform::web::WindowExtWebSys;
        web_sys::window()
            .and_then(|win| win.document())
            .and_then(|doc| {
                let dst = doc.get_element_by_id("wasm-example")?;
                let canvas = web_sys::Element::from(window.canvas());
                dst.append_child(&canvas).ok()?;
                Some(())
            })
            .expect("Couldn't append canvas to document body.");
    }

    let mut state: State = State::new(window).await;
    state.window.set_inner_size(winit::dpi::PhysicalSize::new(200, 100));

    let mut i: f64 = 0.0;
    event_loop.run(move |event, _, control_flow| {
        match event {
            Event::WindowEvent {ref event, window_id} if window_id == state.window.id() => match event {
                WindowEvent::CloseRequested => *control_flow = ControlFlow::ExitWithCode(0),
                WindowEvent::Resized(physical_size) => {
                    state.resize(*physical_size);
                }
                WindowEvent::ScaleFactorChanged {new_inner_size, .. } => {state.resize(**new_inner_size)}
                _ => {}
            }

            Event::RedrawRequested(window_id) if window_id == state.window.id() => {
                match state.render() {
                    Ok(_) => {
                        i += 0.005;
                        state.window.set_inner_size(winit::dpi::PhysicalSize::new(200 + (100.0 * i.sin()) as u32, 200));
                    }
                    Err(e) => eprintln!("{}", e)
                }
            }
            Event::RedrawEventsCleared => {
                state.window.request_redraw()}
            _ => {}
        }
    });
}