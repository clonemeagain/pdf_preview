<?php
require_once INCLUDE_DIR . 'class.plugin.php';

class PDFPreviewPluginConfig extends PluginConfig
{
    // Provide compatibility function for versions of osTicket prior to
    // translation support (v1.9.4)
    function translate()
    {
        if (! method_exists('Plugin', 'translate')) {
            return array(
                function ($x) {
                    return $x;
                },
                function ($x, $y, $n) {
                    return $n != 1 ? $y : $x;
                }
            );
        }
        return Plugin::translate('pdf_preview');
    }

    function getOptions()
    {
        list ($__, $_N) = self::translate();
        return array(
            'pdf' => new SectionBreakField(array(
                'label' => $__('PDF Inliner')
            )),

            'pdf-unsafe-fetch' => new ChoiceField(array(
                'label' => $__('Allow fetching HTML & Text file attachments and embedding'),
                'default' => 'off',
                'choices' => array(
                    'off' => $__('Safest: OFF'),
                    'on' => $__('I accept the dangers: ON')
                )
            )),

            'pdf-enabled' => new ChoiceField(array(
                'label' => $__('PDF Activated for'),
                'default' => "staff",
                'choices' => array(
                    'disabled' => $__('Disabled'),
                    'staff' => $__('Agents Only')
                )
            ))
        );
    }
}