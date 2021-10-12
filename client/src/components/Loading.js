import React from 'react';

export default function Loading() {
    return (
        <div className="loading_back">
            <div className="wave">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
            <div className="stage">
                <div className="bee">
                    <div className="bee__body">
                        <div className="bee__circle bee__circle--black"></div>
                        <div className="bee__circle bee__circle--yellow helper__shift--right-1"></div>
                        <div className="bee__circle bee__circle--black helper__shift--right-2"></div>
                        <div className="bee__circle bee__circle--yellow helper__shift--right-3"></div>
                        <div className="bee__circle bee__circle--black helper__shift--right-4 bee__face">
                            <div className="bee__eyes">
                                <span className="bee__eye"></span>
                                <span className="bee__eye"></span>
                            </div>
                            <div className="bee__antennas">
                                <span className="bee__antenna bee__antenna--left"></span>
                                <span className="bee__antenna bee__antenna--right"></span>
                            </div>
                        </div>
                        <div className="bee__wings">
                            <span className="bee__wing bee__wing--left"></span>
                            <span className="bee__wing bee__wing--right"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
