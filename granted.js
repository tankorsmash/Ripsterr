find_mirror_comments = function(){
        var mirror_roots = [];
        $.each(root_comments, function(i, comment_el) {
            text = $($(".entry .usertext", comment_el)[0]).text();
            contains_mirror = text.search(/mirror/) != -1;
            if (contains_mirror) {
                contains_anchor = $($(".entry .usertext", comment_el)[0]).html().search(/<a/) != -1;
                if (contains_anchor) {
                    mirror_roots.push($(comment_el));
                };
            };
        });

        return mirror_roots;
};

$(function(){
    page_id = $("link[rel=shorturl]").attr('href').replace(/.*\//, "");

    comment_container = $(".sitetable.nestedlisting");
    root_comments = $("#siteTable_t3_"+page_id+" > .comment");

    mirror_roots = find_mirror_comments();

    if (mirror_roots.length != 0) {
        easymirror_el = $("<div id='easymirror'><span class='entry'></span></div>").addClass("thing noncollasped comment");
        tagline = $("<p class='tagline'>")
        .text("EasyMirror")
        .prependTo(easymirror_el)
        .attr("onclick", "return togglecomment(this)"); //use RES toggle 
        expander = $("<span class='expand'>[-]</span>").prependTo(tagline);

        $(".entry", easymirror_el).data("alreadyDetected", true); //get RES to ignore this element tree

        $.each(mirror_roots, function(i, el){
            $("> .entry .usertext", el).clone().appendTo($(".entry", easymirror_el));
        });

        easymirror_el.prependTo(comment_container);
    };
});
