import React, { Component } from 'react';
import FormBuilder from 'components/common/FormBuilder/FormBuilder';
import ProfileView from '../profile-view/ProfileView';
interface IProps {}
interface IState {
}
const defaultForm = {
  profileForm:[
    {key:'image',label:'Upload Photo',type:'file', props:{multiple:false,round:true}},
    {key:'username',label:'Shop Name',props:{}},
    {key:'description',label:'Description',props:{}},
    {key:'phone',label:'Phone',type:'number',props:{}},
    {key:'temp_address',label:'Temporary Address',props:{dependency:['address'],type:'array'}},
    {key:'permanent_address',label:'Permanent Address',props:{dependency:['address']}},
    {key:'status',label:'Status',type:'select',props:{menuItems:[{key:'active',value:'active'},{key:'inactive',value:'inactive'}]}},
    {key:'gender',label:'Gender',type:'select',props:{menuItems:[{key:'male',value:'male'},{key:'female',value:'female'},{key:'others',value:'others'}]}},
  ]
};

class ProfileForm extends Component<IProps> {
  
  render() {
    return (
      <>
        <FormBuilder
          url ={'/user'}
          formName="Profile"
          className ={'edit'}
          buttonTitle={'Profile'}
          form={defaultForm.profileForm}
        />
        <ProfileView/>
      </>
    );
  }
}

export default ProfileForm;
