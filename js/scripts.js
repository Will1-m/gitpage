// Scripts JS para Relive - Añade tus funciones aquí
// js/scripts.js

document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.getElementById('listado-productos');

  // 1. Cargar el JSON de productos
  fetch('data/productos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar productos.json');
      }
      return response.json();
    })
    .then(productos => {
      // 2. Por cada producto, crear una tarjeta y agregarla
      productos.forEach(producto => {
        // Construir la URL relativa de la imagen
        const rutaImg = `img/${encodeURIComponent(producto.categoria)}/${encodeURIComponent(producto.subcategoria)}/${encodeURIComponent(producto.archivo_imagen)}`;

        // Crear el div columna
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6';

        // Crear la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card card-producto';

        // Imagen de la tarjeta
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = rutaImg;
        img.alt = producto.nombre;
        tarjeta.appendChild(img);

        // Cuerpo de la tarjeta
        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body';

        // Título (nombre)
        const titulo = document.createElement('h5');
        titulo.className = 'card-title card-title-producto';
        titulo.textContent = producto.nombre;
        cuerpo.appendChild(titulo);

        // Precio
        const precio = document.createElement('p');
        precio.className = 'card-precio';
        precio.textContent = producto.precio || '';
        cuerpo.appendChild(precio);

        // (Opcional) Botón “Ver más” → enlace a detalle de producto
        // Si quieres crear páginas estáticas por producto, podrías poner:
        // const enlace = document.createElement('a');
        // enlace.href = `producto.html?id=${producto.id}`;
        // enlace.className = 'btn btn-sm btn-primary btn-block';
        // enlace.textContent = 'Ver detalle';
        // cuerpo.appendChild(enlace);

        tarjeta.appendChild(cuerpo);
        col.appendChild(tarjeta);
        contenedor.appendChild(col);
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
      const mensaje = document.createElement('p');
      mensaje.textContent = 'No se pudieron cargar los productos. Intenta nuevamente más tarde.';
      contenedor.appendChild(mensaje);
    });
});
