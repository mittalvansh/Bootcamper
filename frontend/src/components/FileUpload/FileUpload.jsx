import React, { useState } from "react";
import styles from "./FileUpload.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from "react-toastify";

function FileUpload(props) {

    function notify(message) {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            progress: undefined,
        });
    }

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if (file.size > 2097152) {
            notify("File is too big!");
        }
        else {
            props.setFile(file);
        }
    }

    return (
        <>
            <ToastContainer toastStyle={{ backgroundColor: "#262626", color: "#fff" }}/>
            {!props.file ?
                <div className={styles.fileCard}>
                    <div className={styles.fileInputs}>
                        <input type="file" onChange={uploadHandler} accept="image/*" />
                        <button>
                            <i>
                                <FontAwesomeIcon icon={faPlus} />
                            </i>
                            Upload
                        </button>
                    </div>

                    <p className={styles.main}>Supported files</p>
                    <p className={styles.info}>JPG, PNG</p>
                    <p className={styles.info}>Size Limit : 2Mb</p>
                </div> :
                <div className={styles.image}>
                    <img src={URL.createObjectURL(props.file)} alt="" />
                </div>
            }
        </>
    );
}

export default FileUpload;