// import "./AddItem.css"
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
// import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
// import { Button } from 'primereact/button';
import axios from 'axios'
import { useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag'


const AddItem = () => {

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    const token = useSelector(state => state.Token.tokenstr);
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(null);

    const kategories = [
        { name: 'Big Design', code: 'BD' },
        { name: 'Little Design', code: 'LD' },
        { name: 'Birthday', code: 'BIRTH' }
    ];

    const addDesign = async (name, description, price, category) => {
        try {
            const newDesign = { name, description, price, category: category.name };
            console.log(newDesign)
            const res = await axios.post('http://localhost:3600/api/readyDesign/createReadyDesign', newDesign, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
                    'Content-Type': 'application/json',  // ציון סוג התוכן
                }
            })
            if (res.status == 200) {
                alert("נוסף בהצלחה")
                // await sendOrderEmail()

            }

        }
        catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            {/* <div className="m-0">
                <label htmlFor="username">שם המוצר: </label>
                <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="description">תיאור המוצר: </label>
                <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />

                <label htmlFor="integeronly">מחיר</label>
                <InputNumber inputId="integeronly" value={price} onValueChange={(e) => setPrice(e.value)} />

                <label htmlFor="category">קטגוריה</label>
                <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={kategories} optionLabel="name" placeholder="קטגוריה" />
                <br />
                <label htmlFor="category">תמונה</label>
                <div>
                    <Toast ref={toast}></Toast>

                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />



                    <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </div>

                <div className="card flex justify-content-center">
                    <Button label="הוסף עיצוב" onClick={() => addDesign(name, description, price, category)} />
                </div>
            </div>
//---------------------
            <div className="m-0">
                <label htmlFor="username">שם המוצר: </label>
                <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="description">תיאור המוצר: </label>
                <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />

                <label htmlFor="integeronly">מחיר</label>
                <InputNumber inputId="integeronly" value={price} onValueChange={(e) => setPrice(e.value)} />

                <label htmlFor="category">קטגוריה</label>
                <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={kategories} optionLabel="name" placeholder="קטגוריה" />

                <Button label="הוסף עיצוב" onClick={() => addDesign(name, description, price, category)} />
            </div> */}
            <Card title="Simple Card">
                <p className="m-0">
                    {/* <div className="flex flex-column gap-2">
                        שם המוצר:
                        <InputText id="username" aria-describedby="username-help" value={name} onValueChange={(e) => setName(e.value)} />
                        <small id="username-help">
                            שם מוצר ייחודי
                        </small>
                    </div> */}
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="username">שם המוצר: </label>
                            <InputText id="username" aria-describedby="username-help" value={name} onChange={(e) => setName(e.target.value)} />
                            <small id="username-help">
                                שם מוצר ייחודי
                            </small>
                        </div>
                    </div>

                    <div className="card flex justify-content-center">
                        <label htmlFor="integeronly" className="font-bold block mb-2">תיאור המוצר: </label>
                        <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
                    </div>

                    <div className="flex-auto">
                        <label htmlFor="integeronly" className="font-bold block mb-2">מחיר</label>
                        <InputNumber inputId="integeronly" value={price} onValueChange={(e) => setPrice(e.value)} />
                    </div>

                    <div className="card flex justify-content-center">
                        <label htmlFor="integeronly" className="font-bold block mb-2">קטגוריה</label>
                        <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={kategories} optionLabel="name"
                            placeholder="קטגוריה" className="w-full md:w-14rem" />
                    </div>


                    <div>
                        <Toast ref={toast}></Toast>

                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                        <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                    </div>
                    <div className="card flex justify-content-center">
                        <Button label="הוסף עיצוב" onClick={() => addDesign(name, description, price, category)} />
                    </div>
                </p>
            </Card>
        </>
    )
}
export default AddItem;