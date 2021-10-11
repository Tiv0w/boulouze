import React, { ChangeEventHandler } from 'react';
import './FileInput.css';


type Props = {
    fileUploadedName: string;
    handleFileChange: ChangeEventHandler<HTMLInputElement>;
};

const FileInput: React.FC<Props> = (props: Props) => {
    
    return (
        <div className={`
            file-input-container 
            file-input-container-${(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ?  'dark' : 'light'} 
        `}>
            <label>
                <input id="file-input" type="file" onChange={props.handleFileChange} />
                <div className="file-button">
                <span>Choisir un fichier</span>
                </div>
                <span className="file-name">{
                    (props.fileUploadedName?.length > 20 ? props.fileUploadedName.slice(0, 19) + "…" : props.fileUploadedName) 
                    || "Nom du fichier"}
                </span>
            </label>
        </div>
    );
}

export default FileInput;