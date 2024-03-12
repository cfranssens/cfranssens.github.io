use std::sync::Arc;
use wasm_bindgen::prelude::*;

use winit::event_loop::EventLoop;
use winit::window::Window;
use winit::window::WindowBuilder;
use winit::dpi::PhysicalSize;
use winit::platform::web::WindowExtWebSys;

use winit::event::Event;
use winit::event::WindowEvent;

pub struct State { // Handles
    pub device: Arc<wgpu::Device>,
    pub queue: Arc<wgpu::Queue>,

    pub config: Arc<wgpu::SurfaceConfiguration>,
    surface: wgpu::Surface
}

impl State {
    pub async fn new(window: &Window) -> Self {
        let size = window.inner_size();
        let instance = wgpu::Instance::new(wgpu::InstanceDescriptor::default());
        let surface = unsafe {instance.create_surface(window).unwrap()};
        let adapter = instance.request_adapter(&wgpu::RequestAdapterOptions {compatible_surface: Some(&surface), force_fallback_adapter: false, power_preference: wgpu::PowerPreference::LowPower}).await.unwrap();

        let (device, queue) = adapter.request_device(&wgpu::DeviceDescriptor {features: wgpu::Features::POLYGON_MODE_LINE, limits: wgpu::Limits::default(), label: None}, None).await.unwrap();
        let surface_caps = surface.get_capabilities(&adapter);
        let surface_format = surface_caps.formats.iter().copied().filter(|f| f.is_srgb()).next().unwrap_or(surface_caps.formats[0]);
        let config = wgpu::SurfaceConfiguration {usage: wgpu::TextureUsages::RENDER_ATTACHMENT, format: surface_format, width: size.width, height: size.height, present_mode:surface_caps.present_modes[0], alpha_mode: surface_caps.alpha_modes[0], view_formats: vec![]};
        surface.configure(&device, &config);

        Self {device: Arc::new(device), queue: Arc::new(queue), config: Arc::new(config), surface}
    }
}

pub async fn run() {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    console_log::init().expect("Couldn't initialize logger");

    let event_loop = EventLoop::new().unwrap();
    let window = WindowBuilder::new().with_inner_size(PhysicalSize::new(1600, 900)).build(&event_loop).unwrap();
    let state = State::new(&window);

    web_sys::window().
        and_then(|win| win.document()).
        and_then(|doc| {
            let canvas_dst = doc.get_element_by_id("TransWaveGan")?;
            
            let canvas = web_sys::Element::from(window.canvas()?);
            canvas_dst.append_child(&canvas).ok()?;

            Some(())

        }).expect("Couldn't append canvas to document body");

    let info_element = web_sys::window().and_then(|win| win.document()).and_then(|doc| doc.get_element_by_id("Info"));

    event_loop.run(|event, target| {
        match event {
            Event::WindowEvent {window_id, event, ..} => if window.id() == window_id {
                match event {
                    WindowEvent::CloseRequested => {target.exit();},
                    WindowEvent::RedrawRequested => {
                            
                    },
                    _ => {}
                }
            }
            _ => {window.request_redraw();}
        }
    }).expect("Event loop no run");
}
