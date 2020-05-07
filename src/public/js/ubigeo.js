jQuery(function($) {
    $('#departamento').change(function() {
        let item = $('#departamento').val();
        $.ajax({
            type: 'get',
            data: { departamento_id: item },
            url: '/products/provincia',
            success: function(data) {
                console.log(data);
                $('#provincia').empty();
                $('#provincia').prop('disabled', false);
                $('provincia').append("<option disabled selected> Seleccione provincia..</option>");
                $.each(data, function(index, provincia) {
                    $('#provincia').append("<option value = '" + provincia.id + "' > " + provincia.nombre + " </option > ");
                });
            }
        })
    })
    $('#provincia').change(function() {
        let item = $('#departamento').val();
        let item2 = $('#provincia').val();

        $.ajax({
            type: 'get',
            data: {
                departamento_id: item,
                provincia_id: item2
            },
            url: '/products/distrito',
            success: function(data) {
                console.log(data);
                $('#distrito').empty();
                $('#distrito').prop('disabled', false);
                $('distrito').append("<option disabled selected> Seleccione distrito..</option>");
                $.each(data, function(index, distrito) {
                    $('#distrito').append("<option value = '" + distrito.id + "' > " + distrito.nombre + " </option > ");
                });
            }
        })
    })
});