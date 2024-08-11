
import './Detail.css';

function Detail() {
  return (
    <div className="weather-container"> 
      <div className="weather-main">
        <div className="weather-details">
        <h5>FEAB</h5>
        <p>Dimanche</p>
          <div className="detail">
            <p>Humidité relative</p>
            <p>50%</p>
          </div>
          <div className="detail">
            <p>Température de l'air</p>
            <p>30°</p>
          </div>
          <div className="detail">
            <p>Précipitations</p>
            <p>80%</p>
          </div>
          <div className="detail">
            <p>Vent</p>
            <p>22km/h</p>
          </div>
          <div className="detail">
            <p>Point de rosée</p>
            <p>7°</p>
          </div>
          <div className="detail">
            <p>Température du sol</p>
            <p>33°</p>
          </div>
          <div className="detail">
            <p>Humidité du sol</p>
            <p>45%</p>
          </div>
          <div className="detail">
            <p>UV Index</p>
            <p>5</p>
          </div>
          <div className="detail">
            <p>Lever du soleil</p>
            <p>5:22</p>
          </div>
          <div className="detail">
            <p>Coucher du soleil</p>
            <p>18:11</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail
