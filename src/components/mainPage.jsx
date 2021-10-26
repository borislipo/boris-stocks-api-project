import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from 'react-responsive';
import '../App.css'

const useStyles = makeStyles({

    box: {
        backgroundColor: 'white',
        border: "1px solid grey",
        height: 100,
        color: 'black',
        '&:hover': {
            backgroundColor: 'orange',
            color: '#3c52b2',
        },
    }
})

const MainPage = () => {

    const [companyInput, setCompanyInput] = useState('');
    const [companiesArr, setCompaniesArr] = useState();
    const classes = useStyles();
    const isMobile = useMediaQuery({ query: `(max-width: 530px)` });

    let inputInterval;

    useEffect(() => {

        if (companyInput) {
            inputInterval = setInterval(() => {
                fetch(`https://trautocomplete.azurewebsites.net/api/Autocomplete/GetAutocomplete?name=${companyInput}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setCompaniesArr(data);
                    })
                    .catch((e) => {
                        return console.log(e);
                    });
            }, 500)
        }

        return () => clearInterval(inputInterval)

    }, [companyInput])



    return (
        <Grid display='flex' justifyContent='center'>
            <Grid xs={12} item containter>
                <TextField
                    name="companyInput"
                    label={"Company Name"}
                    onChange={(e) => {
                        if (!e.target.value) { setCompanyInput(''); }
                        else {
                            setCompanyInput(e.target.value)
                        }
                    }
                    }
                    value={companyInput}
                />
            </Grid>
            <Grid container xs={12} justifyContent='flex-start'>
                {
                    companiesArr && companiesArr.slice(0, 9).map((company, index) => (
                        <Grid style={{ marginTop: 50, marginLeft: isMobile ? 22 : 100, width: '30%' }} justifyContent='center' key={index} xs={3}>
                            <Box className={classes.box} onClick={() => alert(`Square Index : ${index + 1} company Name : ${company.label}`)} >
                                <Typography noWrap variant="subtitle1">label : {company.label}</Typography>
                                <Typography onClick={(e) => {
                                    alert(`Uid : ${company.uid}`)
                                    e.stopPropagation()
                                }
                                }

                                    variant="subtitle1"
                                    noWrap>Uid : {company.uid}</Typography>
                                <Typography noWrap variant='subtitle1'>{company.value}</Typography>
                            </Box>
                        </Grid>
                    )
                    )
                }

            </Grid>
            <Grid style={{marginTop : 50}}>
                {
                    companiesArr &&
                    <button onClick={() => {
                        setCompaniesArr()
                        setCompanyInput('')
                    }}> Clear Search</button>
                }
            </Grid>
        </Grid>
    )
}

export default MainPage