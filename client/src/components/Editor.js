import { EditableBoard, TextEditorBlock, StyleEditorBlock } from 'react-web-editor';
export default function Editor() {
    const parentStyle = { width: 100, height: 100 };

    return (
        <EditableBoard unit={'rem'} width={parentStyle.width} height={parentStyle.height} backgroundColor={'#F3F0D1'}>
            <TextEditorBlock
                width={16.5}
                height={7}
                top={3}
                left={5.5}
                parentStyle={parentStyle}
                unit={'rem'}
                initialText={'Change Me'}
                initialFontColor={'#ffffff'}
                initialFontSize={0.5}
                initialFontName={'stix-two-text'}
                initialFontStyle={'twin-color-text'}
            />
            {/* <StyleEditorBlock width={7} height={7} left={7.2} top={8} unit={'rem'} parentStyle={parentStyle}>
                <div className="pink circle">Drag</div>
            </StyleEditorBlock>
            <StyleEditorBlock width={5.5} height={5.5} left={12.5} top={11} unit={'rem'} parentStyle={parentStyle}>
                <div className="blue circle">Me</div>
            </StyleEditorBlock> */}
        </EditableBoard>
    );
}
