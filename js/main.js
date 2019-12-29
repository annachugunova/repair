(function($){
        var form = $('#question-form')

        form.submit(function( event ) {
          event.preventDefault();

          var formData = form.serializeArray() 
          var checkingStatus = true
          var data = {}

          for(var i=0; i < formData.length; i++) {
            var name = formData[i].name

            form.find(`[name="${name}"]`).removeClass('error')
            form.find(`#form-${name} span`).removeClass('error')
    
            if(formData[i].value.trim() === '') {
              form.find(`[name="${name}"]`).addClass('error')
              form.find(`#form-${name} span`).addClass('error')
              checkingStatus = false
            }
            else if (name === 'email' && !/@/.test(formData[i].value)){
              form.find(`[name="${name}"]`).addClass('error')
              form.find(`#form-${name} span`).addClass('error')
              checkingStatus = false
            }
            else {
              data[name] = formData[i].value
            }
          }

          if (!checkingStatus) return

          $.ajax({
            url: "/api/",
            method: 'POST',
            data: data,
            success: function() {
              $('.form').removeClass('active')
              $('.success').addClass('active')
              $('.success-description').html(`We appreciate you contacting us <b>${data.name}</b>. We will get back in touch with you soon!<br><br>
        Talk to you soon,<br>
        <b>goTRG Support</b>`)
            },
            error: function() {
              console.log(1)
              $('.alert').show().delay(3000).hide(0);
            },
          });
        });


        $('#clear').on('click', function(event){
          var data = form.serializeArray() 

          for(var i=0; i < data.length; i++) {
            var name = data[i].name

            form.find(`[name="${name}"]`).removeClass('error')
            form.find(`[name="${name}"]`).val('')
            form.find(`#form-${name} span`).removeClass('error')
          }
          event.preventDefault();
        })

        $('.alert-close-btn').on('click', function(event){
          event.preventDefault()
          $('.alert').hide();
        })

        $('input, textarea').bind("keyup change", function(event){
          $(this).removeClass('error')
          $(this).siblings().removeClass('error')
        })

      })(jQuery)