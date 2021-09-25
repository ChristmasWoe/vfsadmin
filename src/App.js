import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Card,
  Button,
  CssBaseline,
} from '@material-ui/core';
import {useDropzone} from 'react-dropzone'
import {Trash as TrashIcon} from 'react-feather'
import { db,storage } from './fb';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

function App() {
  const onDrop = useCallback( async acceptedFiles => {
    const file = acceptedFiles[0];
    setFile(acceptedFiles[0])
    try{
      const storageRef = storage.app.firebase_.storage().ref()
      const fileRef = storageRef.child("imgs/"+file.name);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
      setResult(null)
    }catch(e){
      setResult({status:"error",message:"Such file already exists"})
      setFile(null)
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,multiple:false})
  const [file,setFile] = useState(null)
  const [fileUrl,setFileUrl] = useState("")
  const [result,setResult] = useState(null);

  const onSubmit = async (e,values) => {
    e.preventDefault();
    console.log("submit",e,values)
    try{
      await db.collection("products").add({
        name:values.name,
        description:values.description,
        imageUrl:fileUrl,
      });
      setResult({status:"success",message:"Success"})
    }catch(err){
      setResult({status:"error",message:"Something went wrong"})
    }
   
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
     
      <Form
        onSubmit={()=>{}}
        initialValues={{name:"",description:"" }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                
                <Grid item xs={12}>
                  <Field
                    name="name"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="description"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Description"
                  />
                </Grid>
                <Grid xs={12} item>
                  {file==null?
                   <Card>
                   <div {...getRootProps()}>
                   <input onChange={e=>onDrop(e.target.value)} {...getInputProps()} />
                   {
                     isDragActive ?
                     <p>Drop the files here ...</p> :
                     <p>Drag 'n' drop some files here, or click to select files</p>
                   }
                   </div>
                   </Card>
                  :
                  <Card style={{display:"flex",padding:"4px"}}>
                    <Typography >
                      {file.name}
                      </Typography>
                      <TrashIcon onClick={e=>setFile(null)} style={{marginLeft:"auto"}} />
                  </Card>
                  }
                 
                </Grid>
{/*                 
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Best Stooge</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        label="Larry"
                        control={
                          <Field
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="larry"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Moe"
                        control={
                          <Field
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="moe"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Curly"
                        control={
                          <Field
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="curly"
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                */}
                {/* <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sauces</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        label="Ketchup"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="ketchup"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Mustard"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="mustard"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Salsa"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="salsa"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Guacamole 🥑"
                        control={
                          <Field
                            name="sauces"
                            component={Checkbox}
                            type="checkbox"
                            value="guacamole"
                          />
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Grid> */}
               
                {/* <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="notes"
                    component={TextField}
                    multiline
                    label="Notes"
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="city"
                    component={Select}
                    label="Select a City"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="London">London</MenuItem>
                    <MenuItem value="Paris">Paris</MenuItem>
                    <MenuItem value="Budapest">
                      A city with a very long Name
                    </MenuItem>
                  </Field>
                </Grid> */}
               
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={()=>{setFile(null);form.reset()}}
                    disabled={submitting}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16,marginLeft:"auto" }}>
                  <Button
                    onClick={e=>onSubmit(e,values)}
                    variant="contained"
                    color="primary"
                    // type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            {result!=null?
             result.status=="success"?
             <Typography style={{background:"green"}}>
               {result.message}
             </Typography>
             :
             <Typography  style={{background:"red"}}>
               {result.message}
             </Typography>
             :
             null
             }
           
          </form>
        )}
      />
    </div>
  );
}

export default App;
// ReactDOM.render(<App />, document.querySelector('#root'));
