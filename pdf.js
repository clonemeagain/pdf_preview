// In-Line PDF Preview Plugin. http://github.com/clonemeagain/pdf_preview
$(document)
	.on(
		'ready pjax:success',
		function() {
		    // Only pages with a ticket_id will even work.. so, let's look for
		    // the hidden field named "id" and get it's value.
		    // not such a big deal now that the plugin determines it's inclusion.. but you never know with
		    // pjax..
		    var ticketID = $("input[name='id']").val();
		    if (ticketID > 0) {
			function addElement($source, details, content) {
			    // Each new element should be independant.. 
			    // Ideally this wrapper would be in a stylesheet of it's own.
			    var wrapper = $('<div class="embedded" style="max-width: 100%; width: 100%; height: auto; padding: 4px; border: 1px solid #C3D9FF; margin-bottom: 10px !important;">');
			    wrapper.append('<span class="attachment-description"><a href="' + details.href + '">' + details.name + '</a>'
				    + $source.siblings('em').first()[0].innerHTML + ':</span><br />');
			    wrapper.append(content);
			    details.where.append(wrapper);
			    console.log("Inserted attached document: " + details.name);
			    $source.siblings('em').first().remove();
			    $source.remove();

			}
			/**
			 * Check for attachments
			 */
			$('.file').each(
				function() {
				    // We currently inject the elements into the thread-entry responsible
				    var source = $(this);
				    var details = {
					    where:  source.closest('tbody').find('.thread-body'),
					    name: source.text(),
					    href: source.attr('href'),
					    url: source.attr('href') + '&disposition=inline',
					    ext: source.text().substr(source.text().lastIndexOf('.') + 1).toLowerCase()
				    };

				    // Compare the extension
				    switch (details.ext) {
				    case 'pdf':
					// TODO: convert the sizes to admin configurable settings... if anyone asks.
					// use an <object> wrapping an <embed> for backwards compatibility reasons.
					addElement(source, details,'<object title="' + details.name + '" data="'
						+ url
						+ '" type="application/pdf" height="1000px" width="100%"><embed src="'
						+ url
						+ '" type="application/pdf" height="1000px" width="100%"/></object>');
					break;
				    case 'png':
				    case 'jpg':
				    case 'jpeg':
					// Whatever the image size is.. use that
					// Note the CSS in the wrapper, prevents it overflowing the div.
					addElement(source, details, '<img src="' + details.url + '" />');
					break;
				    case 'txt':
					// Load the text via Ajax and insert into page.
					$.ajax({
					    url : details.href,
					    dataType : "text",
					    success : function(data) {
						addElement(source, details, '<pre>' + data.trim() + '</pre>');
					    },
					});
					break;
					/*
				    case 'html':
					// You might not want this..
					$.ajax({
					    url : details.href,
					    dataType : "html",
					    success : function(data) {
						addElement(source, details, data);
					    },
					});
					break;
					*/
				    default:
					console.log("Unable to add " + details.name);
				    }

				});
		    }
		});
