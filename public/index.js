const formDelete = document.getElementsByClassName('form-delete')[0]
const socket = io();
const contenedoritems = document.getElementsByClassName('contenedor-items')[0];


formDelete.addEventListener('submit', (e) => {
  e.preventDefault();




  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {



    if (result.isConfirmed) {

      let timerInterval;
      Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          


            formDelete.submit()
          


        }
      }).then((result) => {
       
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

     

      

//  formDelete.submit();



    }
  });


})










socket.on('operacion', (data) => {


  
  alert(data.mensaje)

})






socket.on('client-emit', (products) => {
  console.log('products es:', products);


  contenedoritems.innerHTML = '';

  products.forEach(producto => {
    const contenedorProducto = document.createElement('div');
    contenedorProducto.classList.add('contenedor-producto')

    contenedorProducto.innerHTML = `
          <span>Nro: ${producto.id}</span>
          <h2>${producto.title}</h2>
          <span>${producto.description}</span>
          <p>${producto.price}</p>
          <span>${producto.thumbnail}</span>
          <p>${producto.code}</p>
          <p>${producto.stock}</p>
        `;


    const hr = document.createElement('hr');

    contenedoritems.appendChild(contenedorProducto);
    contenedoritems.appendChild(hr);
  });
});