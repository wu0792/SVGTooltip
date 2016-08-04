$(function(){
    $('svg').each(function(index, svg){
        var src = $(svg).data('src')
        $.get({
            url:src,
            dataType:'xml',
            success:function(xml){
                var doc = xml.documentElement
                $(doc).attr({
                    width: $(svg).attr('width'),
                    height: $(svg).attr('height')
                })

                $(svg).after(doc).remove();
            }
        })
    })
});