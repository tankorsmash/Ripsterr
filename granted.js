$.urlParam = function(querystr, name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(querystr);
    if (results==null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
}
$(function(){
    console.log("waiting 1s");
    setTimeout(function(){
        var flashVars = $("#SongsterrPlayer > param[name=flashvars]");

        if (flashVars.attr("value")) {
            raw_qs = flashVars.attr("value");
            revision_id = $.urlParam(raw_qs, "revision");

            GET_XML_URL = "https://www.songsterr.com/a/ra/player/songrevision/"+revision_id+".xml"
            $.get(GET_XML_URL, function(resp){
                tab_xml = resp;
                tab_obj = $(tab_xml);
                tab_url = $("guitarProTab attachmentUrl ", tab_xml).text();
                console.log("Ripsterr found the url "+tab_url);

                $("<a class='button'>Download tab!</a>").attr("href", tab_url).appendTo($(".headingWrapper .inlineHeading"));
            });
        } else {
            console.log("couldnt find flash variables for the guitar pro file");
        }
    }, 1000);
});
