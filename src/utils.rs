use wgpu::util::DeviceExt;

pub fn create_buffer(device: &wgpu::Device, label: Option<&str>, contents: &[u8], usage: wgpu::BufferUsages) -> wgpu::Buffer {
    device.create_buffer_init(&wgpu::util::BufferInitDescriptor {label, contents, usage})
}