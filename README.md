# pdf_preview
An osTicket plugin allowing inlining of Attachments


Simply `git clone https://github.com/clonemeagain/pdf_preview.git /path/to/your/osTicket/Installation/includes/plugins/`

Navigate to: https://your.domain/support/scp/plugins.php?a=add to add a new plugin.

Click "Install" next to "PDF Inline Viewer"

Now the plugin needs to be enabled & configured, so you should be seeing the list of currently installed plugins, pick the checkbox next to "PDF Inline Viewer" and select the "Enable" button.

Now you can configure the plugin, click the link "PDF Inline viewer" and choose who the plugin should be activated for, or keep the default.


To remove the plugin, simply return to the plugins view, click the checkbox and push the "Disable" button, then check it again, and push the "Delete" button.

The plugin will still be available, you have deleted the config only at this point, to remove after deleting, remove the /plugins/pdf_preview folder.
