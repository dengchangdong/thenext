// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015 
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
// 
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
// 

var searchFunc = function(path, search_id, content_id) {
    "use strict";
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $("entry", xmlResponse).map(function() {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();
            var $input = document.getElementById(search_id);
            if (!$input) return;
            var $resultContent = document.getElementById(content_id);
            $input.addEventListener("input", function(){
                var str="<ul class=\"result-list\">";                
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                    $resultContent.innerHTML = "<p class=\"result-icon\"><i class=\"icon-search genericons\"></i></p>";
                if (this.value.trim().length <= 0) {
                    $resultContent.classList.add("no-result");
                    return;
                }
                // perform local searching
                var numOfPostFound = 0; // keeping track of # of result
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != "") {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        $resultContent.classList.remove("no-result");
                        numOfPostFound += 1; // keeping track of # of results
                        str += "<li><a href='"+ data_url +"'>"+ data_title +"</a>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 10;
                            var end = first_occur + 20;
                            if(start < 0){
                                start = 0;
                            }
                            if(start == 0){
                                end = 20;
                            }
                            if(end > content.length){
                                end = content.length;
                            }
                            var match_content = content.substr(start, end); 
                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em>"+keyword+"</em>");
                            });
                            
                            str += "<p>" + match_content +"...</p>"
                        }
                        str += "</li>";
                    }
                });
                str += "</ul>";
                // attaching a summary of searching result
                if (numOfPostFound > 0) {
                    if (numOfPostFound > 1) {
                        summary = "共找到 " + numOfPostFound + " 条记录";
                    } else {
                        summary = "共找到 " + numOfPostFound + " 条记录"; // Only one
                    }
                    var summary = "<p class=\"search-stats\">" + summary + "</p>";
                } else {
                    $resultContent.classList.add("no-result");
                    summary = "<p class=\"result-icon\">没有找到内容</p>";
                }
                $resultContent.innerHTML = summary + str;
            });
        }
    });
}