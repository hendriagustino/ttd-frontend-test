import React, {Component} from 'react';
import axios from 'axios';
import { InputGroup, Input, Button, Container, Row, Col } from 'reactstrap';
import Spinner from './../UI/Spinner/Spinner';

class MovieTitles extends Component{

    state = {
        value: '',
        title: [],
        totalPage: null,
        spinner: false,
        submitted: false
    };

    onValueChange = (e) =>{
        e.preventDefault();
        this.setState({
            value : e.target.value
        }); 
    };

    refreshPage = () =>{
        window.location.reload();
    }

    getMovieTitle = (e) =>{
        e.preventDefault();
        
        this.setState({
            ...this.state,
            spinner: true
        });

        //sending http request to get the "number" of total_pages of the movie title search
        axios.get('https://jsonmock.hackerrank.com/api/movies/search/?Title='+ this.state.value)
        .then(res=>{

            //store the "number" of total_pages from the response (res.data.total_pages)
            let totalPage = res.data.total_pages;
            
            //looping http GET request for n times (which is the amount saved in totalPage variable) 
            for (let i=1; i <= totalPage; i++){
                axios.get('https://jsonmock.hackerrank.com/api/movies/search/?Title='+ this.state.value + '&page=' + i )
                .then(res=>{

                    //return only the Title key-value from the data we get back and then save in a variable
                    let newData = res.data.data.map(data=>{
                        return data.Title;
                    });
                    
                    //setting state or saving the title datas into state.title
                    this.setState({
                        ...this.state,
                        title: [...this.state.title, ...newData]
                    })
                    
                })

                .then(res=>{
                    this.setState({
                        spinner: false,
                        submitted: true
                    })
                })

            }
            
        })
    };
    
    render(){
        
        //here will always the last render or be the last render of components. So we do the
        // .sort() function of the total titles we get back from sending the GET http request
        //before then we do the .map() function
        // if()

        let titleMapping = (
            this.state.title.sort().map( title=>{
                return <h3 className="border-bottom my-2">{title}</h3>
            })
        );
        
        return(
            <Container>
                <h1 className="my-3">Search Movie Titles</h1>
                    <form className="my-2" onSubmit={this.getMovieTitle}>
                        <InputGroup>
                            {
                                this.state.submitted 
                                ? 
                                    (   
                                        <React.Fragment>
                                            <Col>
                                                <h3 className="text-center">You searched for: {this.state.value}</h3>
                                                <Button className="btn btn-lg" onClick={this.refreshPage}>
                                                    Click to search again
                                                </Button> 
                                            </Col>
                                            <br/>
                                        </React.Fragment>
                                    )
                                : 
                                <Input className="text-center" type="text" name="title" id="title" onChange={this.onValueChange}/>
                            }

                        </InputGroup>
                        <Button className="mt-2 mb-3 bg-success" type="submit">Submit</Button>
                    </form>
                    
                    {this.state.spinner? <Spinner/>: titleMapping}
            </Container>
        );
    }
};

export default MovieTitles;
