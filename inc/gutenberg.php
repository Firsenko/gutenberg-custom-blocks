<?php
/**
 * Custom Gutenberg function
 */

function fira_gutengerg_default_colors()
{
    add_theme_support('editor-color-palette',
       array(
           array(
                'name'  => 'Лиловый',
                'slug'  => 'lile',
                'color' => '#bfaddc',
           ),
           array(
                'name'  => 'Белый',
                'slug'  => 'white',
                'color' => '#ffffff',
           ),
           array(
                'name'  => 'Черный',
                'slug'  => 'black',
                'color' => '#000000',
           )
       )
    );

    add_theme_support('editor-font-sizes',
        array(
            array(
                'name'  => 'Normal',
                'slug'  => 'normal',
                'size' => 16,
            ),
            array(
                'name'  => 'Large',
                'slug'  => 'large',
                'size' => 24,
            ),
        )
    );

}

add_action('init', 'fira_gutengerg_default_colors');

function fira_gutenbergs_block(){

    wp_register_script('custom-cta-js', get_template_directory_uri(). '/build/index.js', array('wp-blocks', 'wp-editor', 'wp-components'));
    register_block_type('fira/custom-cta', array(
        'editor_script' => 'custom-cta-js'
    ));
}

add_action('init', 'fira_gutenbergs_block');