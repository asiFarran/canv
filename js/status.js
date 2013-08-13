var d = document.createElement("div");
d.id = 'status';
d.style.cssText ="position:absolute;z-index:20;top:10px;right:10px;background-color:#fff;padding:10px;border:solid 1px #ccc;";
document.body.appendChild(d);

function updateStatus(key, data){
    var id = 'status_' + key;
    $('#' + id).remove();

       var display = document.createElement("div");
       display.id = id;
    $('#status').append(display);

        for(var prop in data){
            $('#' + id).append('<div>' + prop + ': ' + data[prop] + '</div>')
        }


}
