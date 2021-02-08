import { Button } from "reactstrap";
import { Card } from 'reactstrap';

export default function GameBox(props) {
    return (
        <>
            {
                props.startGame ? (<>


                    <Card body outline color="info">
                        <div className="slide">
                            <div className="slideBox">{props.res[0]}</div>
                            <div className="slideBox">{props.res[1]}</div>
                            <div className="slideBox">{props.res[2]}</div>
                        </div>
                        <br />
                        <br />
                        <div>
                            <Button
                                onClick={props.nextSpin}
                                className="button"
                            >Spin</Button>
                            <Button
                                onClick={props.resetSpin}
                                className="button"
                            >Reset</Button>
                            <Button
                                onClick={props.start}
                                className="button"
                            > Close Game</Button>
                        </div>
                    </Card>


                </>
                ) : null
            }
        </>
    )
}