const { registerBlockType } = wp.blocks;
const { RichText,
        InspectorControls,
        ColorPalette,
        MediaUpload
    } = wp.editor;

const { PanelBody, IconButton } = wp.components;

const blockStyle = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '20px',
};

registerBlockType('fira/custom-cta', {
    // built-in attributes
    title:'Call to Action',
    description: 'Block to generate a custom Call to Action',
    icon: 'format-image',
    category: 'layout',
    //custom attributes
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2'
        },
        titleColor: {
            type: 'string',
            default:'black'
        },
        body: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
        backgroundImage: {
            type: 'string',
            default: null
        }
    },

    // built-in functions
    edit({ attributes, setAttributes }) {
        const {
            title,
            titleColor,
            body,
            backgroundImage
        } = attributes;

        //custom functions
        function onChangeTitle(newTitle){
            setAttributes({ title:newTitle });
        }
        function onChangeBody(newBody){
            setAttributes({ body:newBody });
        }

        function onTitleColorChange(newColor) {
            setAttributes({ titleColor:newColor });
        }

        function onSelectImage(newImage){
            setAttributes( { backgroundImage: newImage.sizes.full.url } );
        }

        //custom

        return ([
            <InspectorControls style={ { marginBottom: '40px' } }>
                <PanelBody title={ 'Font Color settings' }>
                    <p><strong> Select a Title color: </strong></p>
                    <ColorPalette value={ titleColor }
                                  onChange={onTitleColorChange } />
                </PanelBody>
                <PanelBody title={ 'Background Image settings' }>
                    <p><strong> Select a Background Image: </strong></p>
                   <MediaUpload onSelect={ onSelectImage }
                                type="image"
                                value= { backgroundImage }
                                render={ ({open}) => {
                                    return <IconButton
                                                onClick={ open }
                                                icon="upload"
                                                className="editor-media-placeholder__button is-button is-default is-large">
                                                    Background Image
                                            </IconButton>

                                    }
                                }
                   />
                    <img style={ { marginTop: '20px' } }
                        src={backgroundImage}
                    />
                </PanelBody>
            </InspectorControls>,
            <div class="cta-container"
                 style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                <RichText key="editable"
                          tagName="h2"
                          placeholder="Your CTA Title"
                          value={ title }
                          onChange={ onChangeTitle }
                          style={ { color: titleColor } } />
                <RichText key="editable"
                        tagName="p"
                        placeholder="Your CTA Body"
                        value={ body }
                        onChange={ onChangeBody } />
            </div>
        ]);
    },
    save( { attributes } ) {
        const {
            title,
            body,
            titleColor,
            backgroundImage
        } = attributes;

        return (
            <div class="cta-container"
                 style={{
                     backgroundImage: `url(${backgroundImage})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
                 }}>
                <h2  style={ { color: titleColor } } > { title } </h2>
                <RichText.Content tagName="p"
                                    value={ body } />
            </div>
        );
    },
    
});