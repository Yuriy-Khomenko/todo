import React from 'react';
import { Button } from 'reactstrap';
import resizeImage from 'resize-image';

class CreatePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            user: '',
            email: '',
            task: '',
            //err_status: this.props.err_status,
            sin_err_status: this.props.sin_err_status,
        };
        this.err_status = this.props.err_status;
    }

    resize(url, type) {
        let img = new Image();
        img.onload = () => {
            let data = resizeImage.resize(img, 320, 240, type);
            let smallImg = new Image();
            smallImg.src = data;

            function dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            }
            var file = dataURLtoFile(data);
            this.setState({
                file: file,
                imagePreviewUrl: data
            });
        };
        img.src = url;
    }


    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }


    fetchData = () => {
        let data = {
            username: this.state.user,
            email: this.state.email,
            text: this.state.task,
            image: this.state.file
        };
        this.props.onFetch(data);
    }

    errorMsg = () => {

        let msg = "";
        if (this.props.sin_err_status) {
            msg = msg + " " + this.props.sin_err_string;
        } else if (this.props.err_status !== this.err_status) {
            this.err_status = this.props.err_status;
            for (let item in this.props.err_string) {
                msg = msg + item + " - " + this.props.err_string[item] + ", ";
            }
            msg = msg.substring(0, msg.length - 2);
        }

        if (msg.length) {
            return (
                <div>
                    {this.props.sin_err_status !== 2 ?
                        <div>
                            <h4 className="text-color-error-header"> помилка </h4>
                            <h5 className="text-color-error"> {msg} </h5>
                        </div>
                        :
                        <div>
                            <h4 className="text-color-corect-header"> повідомлення </h4>
                            <h5 className="text-color-corect"> {msg} </h5>
                        </div>
                    }
                </div >
            )
        }
    }


    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.resize(reader.result, 'resizeImage.JPEG');
        }
        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} alt={"img1"} />);
        } else {
            imagePreview = (<div className="previewText"></div>);
        }

        return (

            <div className="container">
                <div className={"row justify-content-center"}>
                    {<div className={"loader-size"}>{this.errorMsg()} </div>}
                </div>

                <div className="row m-2 justify-content-center">
                    <label className="col-2 col-form-label">користувач:</label>
                    <div className="col-3">
                        <input className="form-control" type="text" id="name-tovar" name="user" value={this.state.user} onChange={this.handleChange} />
                    </div>
                </div>

                <div className="row m-2 justify-content-center">
                    <label className="col-2 col-form-label">е-mail:</label>
                    <div className="col-3">
                        <input className="form-control" type="email" id="price-input" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                </div>

                <div className="row m-2 justify-content-center">
                    <label className="col-2 col-form-label">текст задачі:</label>
                    <div className="col-3">
                        <input className="form-control" type="text" id="price-input" name="task" value={this.state.task} onChange={this.handleChange} />
                    </div>
                </div>

                <br />

                <div className="row m-2 justify-content-center">
                    <label className="col-2 col-form-label">картинка:</label>
                    <div className="col-3">
                        <input className="form-control-file"
                            type="file"
                            onChange={(e) => this.handleImageChange(e)} />
                    </div>
                </div>

                <div className="">
                    {imagePreview}
                    <img id="display" alt={"previe"} />
                </div>


                <div className="row col-12 justify-content-center">
                    <Button onClick={this.fetchData}
                        className={"bg-success m-2"} >
                        СТВОРИТИ
                    </Button>

                </div >
            </div >
        )
    }
}

export default CreatePage;