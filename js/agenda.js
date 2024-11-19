

document.addEventListener('DOMContentLoaded', function() {

    

    let calendarEl = document.getElementById('agenda');
    let calendar = new FullCalendar.Calendar(calendarEl, {

      initialView: 'dayGridMonth',
      locale:'es',
      displayEventTime: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth'
      },
      events:"/evento/mostrar",

      dateClick:function(info){
        let formulario = document.getElementById('formularioEvento');
        formulario.reset();
        formulario.start.value=info.dateStr;
        formulario.end.value=info.dateStr;

        $("#evento").modal("show");
      }
    });
    calendar.render();

    // Boton Guardar
    document.getElementById("btnGuardar").addEventListener("click", function(){

      const formulario = $('#formularioEvento').serialize();

      $.ajax({
          url: "/evento/agregar",
          method: 'POST',
          data: formulario,
          success: function(response){
            alert(response.message);
            $('#evento').modal("hide");
          },
          error: function(error){
           console.log(error);
          }
      });

    });

    //Boton Eliminar
    //document.getElementById('btnEliminar').addEventListener('click', function(){
    //    enviarDatos("/evento/borrar/"+formulario.id.value);
    //});

    //Boton Modificar
    //document.getElementById('btnModificar').addEventListener('click', function(){
    //    enviarDatos("/evento/actualizar/"+formulario.id.value);
    //});


});
