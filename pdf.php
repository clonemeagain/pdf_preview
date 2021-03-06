<?php
require_once (INCLUDE_DIR . 'class.plugin.php');
require_once ('config.php');

class PDFPreviewPlugin extends Plugin
{

    var $config_class = 'PDFPreviewPluginConfig';

    /**
     * Required stub.
     *
     * {@inheritDoc}
     *
     * @see Plugin::uninstall()
     */
    function uninstall()
    {
        $errors = array();
        parent::uninstall($errors);
    }

    function bootstrap()
    {
        /**
         * If signals actually worked, we'd use one here.
         * Signal::connect('staff.scp', array(
         * 'PDFPreviewPlugin',
         * 'callbackDispatch'
         * ));
         */
        // Load our Admin defined settings..
        // So far, only the one has been set.
        // Who this should be enabled for.
        // I'm currently assuming customers don't need to preview their PDF attachments.
        // So, it really only works for Staff.
        // This $config is generated by the $config_glass defined above.
        $config = $this->getConfig();

        // This should retrieve any admin settings saved in the database about this setting.
        // Presumably one needs to use the same namespaced-ish name for the setting.
        $enabled = $config->get('pdf-enabled');

        // See if the functionality has been enabled for Staff/Agents
        // We could simply do away with this setting altogether and rely on "Is the plugin enabled"
        if (in_array($enabled, array(
            'staff'
        ))) {
            // Check what our URI is, if acceptable, add to the output.. :-)
            // Looks like there is no central router in osTicket yet, so I'll just parse REQUEST_URI
            if (preg_match('/\/scp\/tickets\.php/i', $_SERVER['REQUEST_URI'])) {
                // How to get our script into the page? can't just link, anything under /include is denied by .htaccess.
                $script = file_get_contents(dirname(__FILE__) . '/pdf.js');

                // See if html/text option is enabled:
                $types = $config->get('pdf-unsafe-fetch');
                if (in_array($types, array(
                    'on'
                ))) {
                    // Well, the admin wants us to pull HTML & TEXT from attachments and embed them too!
                    // To keep it "safe by default", the textHandler call isn't included by default.
                    $script = str_replace("case 'html':", "case 'html': return textHandler(source, details);", $script);
                }

                // We could hack at core, or we can simply capture the whole page output and modify the HTML then..
                // Not "easier", but less likely to break core.. right?
                // There appears to be a few uses of ob_start in the codebase, but they stack, so it might work!
                ob_start();

                // By passing the parameter to the anonymous function to register_shutdown_function
                // We should be able to pass the script definition to the the
                register_shutdown_function(function ($script) {
                    $html = ob_get_clean();

                    // Do we have to check for pjax?, in-case someone is using this plugin with an older version or something
                    // Dunno, might be worthwhile?
                    if (! preg_match('/\.support\.pjax/i', $html)) {
                        $script = str_replace('ready pjax:success', 'ready', $script);
                    }

                    // We need to add our javascript, best-ish place for this is before the final body tag..
                    $html = str_replace('</body>', "<script>$script</script>\n</body>", $html);

                    // Now we can send it to the browser. :-)
                    print $html;
                }, $script);
            }
        }
    }

    public function getForm()
    {
        return array();
    }
}
