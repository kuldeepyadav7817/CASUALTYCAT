import '../css/AdminCIReportWord.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from './sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import AdminTopNavHome2 from '../widgets/AdminTopNavHome2';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientServices from '../../services/ClientServices';

DocumentEditorContainerComponent.Inject(Toolbar);

function AdminCIReportWord() {
    React.useEffect(() => {
        container.documentEditor.enableLocalPaste = false;
        updateSampleSection();
        rendereComplete();
        componentDidMount();
    }, []);

    function componentDidMount() {
        if (container != undefined)
            if (container.documentEditor != null)
                container.documentEditor.keyDown = args => {
                    let keyCode = args.event.which || args.event.keyCode
                    let isCtrlKey =
                        args.event.ctrlKey || args.event.metaKey
                            ? true
                            : keyCode === 17
                                ? true
                                : false
                    let isAltKey = args.event.altKey
                        ? args.event.altKey
                        : keyCode === 18
                            ? true
                            : false
                    let isShiftKey = args.event.shiftKey
                        ? args.event.shiftKey
                        : keyCode === 16
                            ? true
                            : false
                    if (isCtrlKey && !isAltKey && keyCode === 83) {
                        args.isHandled = true;
                        container.documentEditor.save(localStorage.getItem("cID"), "Docx");
                        args.event.preventDefault();
                    }
                    else if (isCtrlKey && !isShiftKey && keyCode === 86) {
                        args.isHandled = true;
                        args.event.preventDefault();
                    }
                }
    }

    let hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
    let container;
    let titleBar;
    function rendereComplete() {
        container.serviceUrl = hostUrl + 'api/documenteditor/';
        container.documentEditor.pageOutline = '#E0E0E0';
        container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
        onLoadDefault();
    }

    const reload = () => {
        window.location.reload(false);
    };

    const saveDoc = () => {
        if (container != undefined)
            if (container.documentEditor != null)
                container.documentEditor.saveAsBlob("Docx").then(exportedDocument => {
                    var formData = new FormData();
                    formData.append('file', exportedDocument);
                    const docData = {
                        clientID: localStorage.getItem("cID"),
                        formData: formData
                    };
                    ClientServices.uploadCIReport(docData)
                        .then(response => {
                            if (response.data != null) {
                                reload();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                })
    };

    return (
        <div>
            {/* {isLoading && <AdminSpinner />} */}
            <ToastContainer position="top-right" />
            <AdminTopNavHome2 clientID={localStorage.getItem("cID")}></AdminTopNavHome2>
            <div onKeyDown={componentDidMount()}>
                <div className='web_admin_cireport_word'>
                    <div>
                        <div className='web_admin_cireport_word_area'>
                            <div>
                                <div className='control-pane'>
                                    <div className='control-section'>
                                        <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                                        <div id="documenteditor_container_body">
                                            <DocumentEditorContainerComponent id="container" enableLocalPaste={false} isReadOnly={false} enableSelection={true} enableEditor={true} ref={(scope) => { container = scope; }} style={{ 'display': 'block', width: '98vw', overflowY: 'scroll' }} height={'75vh'} enableToolbar={true} locale='en-US' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right', marginRight: '20px', marginTop: '3px' }}>
                            <Button className='web_superadmin_dashboard_new_button24' onClick={saveDoc} style={{ marginRight: '15px' }}>SAVE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    function onLoadDefault() {
        // tslint:disable
        ClientServices.getSavedWord(localStorage.getItem("cID"))
            .then(response => {
                container.documentEditor.open(JSON.stringify(response.data));
                container.documentEditor.documentName = 'CI Report';
                titleBar.updateDocumentTitle();
                container.documentChange = () => {
                    titleBar.updateDocumentTitle();
                    container.documentEditor.focusIn();
                };
                container.documenteditor.selection.sectionFormat.topMargin=0;
                container.documenteditor.selection.sectionFormat.headerDistance = 0;
            })
            .catch(e => {
                console.log(e);
            });

    }
}
export default AdminCIReportWord;
