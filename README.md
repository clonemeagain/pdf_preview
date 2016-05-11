# PDF Preview
An osTicket plugin allowing inlining of Attachments


Simply `git clone https://github.com/clonemeagain/pdf_preview.git /path/to/your/osTicket/Installation/includes/plugins/`

Navigate to: https://your.domain/support/scp/plugins.php?a=add to add a new plugin.

Click "Install" next to "PDF Inline Viewer"

Now the plugin needs to be enabled & configured, so you should be seeing the list of currently installed plugins, pick the checkbox next to "PDF Inline Viewer" and select the "Enable" button.

Now you can configure the plugin, click the link "PDF Inline viewer" and choose who the plugin should be activated for, or keep the default.


To remove the plugin, simply return to the plugins view, click the checkbox and push the "Disable" button, then check it again, and push the "Delete" button.

The plugin will still be available, you have deleted the config only at this point, to remove after deleting, remove the /plugins/pdf_preview folder.


#How it looks:

![agent_view](https://cloud.githubusercontent.com/assets/5077391/15166401/bedd01fc-1761-11e6-8814-178c7d4efc03.png)


# How it works:

It's pretty simple, the bulk of the work is done in javascript, which get's injected into the footer. Tested and works on 1.8-git. SHOULD work on future versions, depending on how the files are attached.. haven't tested on anything else though, let me know! This means it gracefully falls back to complete stock by disabling javascript, and the plugin is self-contained, so ZERO MODS to core are required. You simply clone the repo or download the zip from github and extract into /includes/plugins/ which should make a folder: "pdf_preview", but it could be called anything. 

Current features:
-PDF Files attached to a thread entry (note/message/reply etc) are embedded as full PDF objects in the entry.
-Images attached to a thread entry are inserted as normal <img> tags.
--png
--jpg
--gif
--svg
--bmp
-Text files attached to a thread entry are fetched via AJAX and inserted into the thread entry using <pre> (If enabled). 
-HTML files are also fetched via AJAX and inserted (If enabled). 
-Detects pjax and falls back to stock jQuery if not found.

Message me if you want more features, I'm thinking of adding a "Tick the box extension selection" or something to pick what to display.

TODO:
-Extrude CSS into file
-Add admin options for file-types
-Maybe modify the output in PHP rather than JS.. haven't decided, see what people say. This is working for now.
