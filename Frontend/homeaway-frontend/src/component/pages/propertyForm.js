import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import {Link} from 'react-router-dom'; 
import PropForm from './propForm'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class PropertyForm extends Component {
    constructor(props){
        super(props)
        this.state={
            errMsg:'',
            msg:'',
            property:[],
            files:[],
            accepted: [],
            rejected: [],
            key:0
        }
    }
    componentDidMount(){
        if(this.props.form === "edit"){
            var result = this.props.arrayData.filter(obj => 
                obj.propid === parseInt(this.props.location.data)
            )
            if(typeof result !== "undefined"){
            result[0].availFrom = moment(result[0].availFrom).format('YYYY-MM-DD')
            result[0].availTo = moment(result[0].availTo).format('YYYY-MM-DD')
            this.setState({
                property: result
            })
        }
        }
    }
    onDrop(files) {
        if(files[0].type.includes('image/')){
            this.setState({
            files
            }, ()=>{
            console.log(files);
        });
    } else{
        console.log("Wrong file uploaded")
    }
    }
    property =(values) =>{
        if(this.props.form !=="edit"){
            //Add Property Code
            console.log(values)
            values['email'] = this.props.login.email;
            this.props.postProperty(values);
        } else {
            //Update Property Code
            console.log(values)
            values['email'] = this.props.login.email;
            this.props.updateProp(values);
        }
        this.setState({key:1})
    }
    upload = async (e) => {
        e.preventDefault();
        console.log(this.state.accepted)
        let acceptedFiles = this.state.accepted;
        var formData = new FormData();
        acceptedFiles.forEach((file,key) => {
            formData.append(`image${key+1}`,file)
        })
        let propid = null
        if(this.props.form ==="edit"){
            propid = this.props.location.data
        } else {
            propid = this.props.property.propid
        }
        formData.append("propid", propid );
        console.log(formData)
        const config = { headers: {'Content-Type': 'multipart/form-data' }};
        axios.post("/imageUpload",formData,config)
        .then(response=>{
            console.log(response.status)
            if(response.status ===200){
                this.setState({msg:"Your Property has been successfully added to the listing."})
            }
        })
    }
    render(){
        let messages = (
                <div style={{marginBottom:'20px'}}>
                <PropForm onSubmit={this.property} initialValues={this.state.property[0]}/>
                </div>   
            )
        
        let imageUpload =(
             <div className="imageupload">
            {this.state.msg!=="" ?
            <div className="alert alert-success fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			{this.state.msg}
    		</div>: null}
            
             <h3>Image Upload</h3>
             <h5>Please upload upto maximum of four images.</h5>   
             <form id="frmUploader" encType="multipart/form-data">
             <section>
                <div className="dropzone">
                    <Dropzone accept="image/jpeg, image/png" multiple={true}
                        onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }) ;}}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                    {
                        this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                    </ul>
                </aside>
        </section>
        <button className= "btn btn-primary btn-lg" style={{margin:'20px'}} onClick={this.upload} name="submit" id="btnSubmit">Upload</button>
        </form>
            <Link to="/ownerhome" className="col-sm-offset-9 col-sm-3">Go to Dashboard</Link>
            </div>
        )
        return(
                <div className="col-sm-offset-2 col-lg-8 col-sm-offset-2 property-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
           
                <h2>Property Information</h2>
                <div className="propertytab" style={{ marginTop: "40px" }}>
                <Tabs selectedIndex={this.state.key} onSelect={key => this.setState({ key, msg:'' })}>
                    <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Images</Tab>
                    </TabList>

                    <TabPanel>
                        {messages}
                    </TabPanel>
                    <TabPanel>
                        {imageUpload}
                    </TabPanel>
                </Tabs>
             </div>
                
            </div>   
        )
    }
}
PropertyForm.propTypes = {
    property: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    fetchProperty: PropTypes.func.isRequired,
    postProperty: PropTypes.func.isRequired 
}

function mapStateToProps(state){
    return {login: state.login,property: state.property, error:state.property.error,arrayData:state.arrayData.arrayData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PropertyForm);