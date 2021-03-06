import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

class GifArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //Ruta: data<[index]<images<original<url
  getApi=async()=>{
    let url= "https://api.giphy.com/v1/gifs/trending?api_key=LlMFRKH1LFUFQwmF51v05p3dm9TFYUf0"
    if(this.props.search!==""){
      url="https://api.giphy.com/v1/gifs/search?api_key=LlMFRKH1LFUFQwmF51v05p3dm9TFYUf0&q="+this.props.search;
      
    }
    const result = await fetch(url);
    const resultJson = await result.json();
    console.log(resultJson);
       const arrayUrls = resultJson.data.map((value) => value.images.original.url);
    console.log(arrayUrls);
    this.setState({ trendingUrls: arrayUrls });

  }
  componentDidMount() {
    this.getApi()
  }
  componentDidUpdate() {
    this.getApi()
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            {this.state.trendingUrls ? (
              this.state.trendingUrls.map((value) => {
                return (
                  <Col xs="3">
                    <span>
                      <img className="img-fluid p-1" src={value} alt="gif" />
                    </span>
                  </Col>
                );
              })
            ) : (
              <p>
                Estamos trabajando en ello
                <Spinner color="danger" />
              </p>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
export default GifArea;
