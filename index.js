//////////////////////////////////////////////////////////////////////////////////////////////////////////
///// There's only JAVASCRIPT, and WEB AUDIO API is included (API is application programming interface)
///// Without any frameworks or any libraries
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Declare global element
const screen = document.getElementsByClassName('screen')
const backgroundVideo = document.getElementById('bgVideo')
const backgroundAudio = document.getElementById('bgAudio')

const scrollLayer = document.getElementById('scrollLayer')
const layer4dx = document.getElementById('layer4DX')
const playVideoBtn = document.getElementById('playVideoButton')
const logo4dx = document.getElementById('Logo4DX')
const header4dx = document.getElementById('Header4DX')
const text4dx = document.getElementById('Text4DX')
const button4dx = document.getElementById('Button4DX')

const scrollIcon = document.getElementById('scrollIcon')
const textAndButton = document.getElementById('textAndButton')
const textContainer = document.getElementById('textContainer')
const seat = document.getElementById('seat')
const buttonIcon = document.getElementsByClassName('button')
const effectFrontLayer = document.getElementById('effectFrontLayer')
const effectBackLayer = document.getElementById('effectBackLayer')


//////// view includes event's callback, handle-screen-function
const view = {}
view.windowScroll = () => {
    model.scrollY = window.scrollY
    //// fix scroll to exactly screen' positions by behavior smooth
    if (innerWidth > 481) {
        if (model.windowScrollDeltaY > 0) {
            if (model.scrollY < innerHeight) {
                seat.style.animation = ``
                window.scrollTo({
                    top: innerHeight,
                    left: 0,
                    behavior: 'smooth'
                })
            } else if (model.scrollY > innerHeight) {
                window.scrollTo({
                    top: innerHeight + 348,
                    left: 0,
                    behavior: "smooth"
                })
            }
        } else if (model.windowScrollDeltaY < 0) {
            if (model.scrollY < innerHeight) {
                view.clearCurrentEffect()
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            } else if (model.scrollY > innerHeight) {
                window.scrollTo({
                    top: innerHeight,
                    left: 0,
                    behavior: "smooth"
                })
            }
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto',
            })
            model.scrollY = window.scrollY
        }
    }
    //// responsive showing cover-video-background layer
    if (model.scrollY === 0) scrollLayer.style.zIndex = -1
    else scrollLayer.style.zIndex = 2
    if (model.scrollY <= innerHeight) scrollYForLayer = model.scrollY
    else scrollYForLayer = innerHeight
    scrollLayer.style.backgroundColor = `rgba(0, 0, 0, ${scrollYForLayer / (innerHeight - innerHeight * .1)})`
    //// resposive showing text
    if (model.scrollY <= innerHeight - 200) {
        textAndButton.style.opacity = 0
    } else {
        scrollYForTextAndButton = Math.abs(model.scrollY - innerHeight)
        textAndButton.style.opacity = Number(((200 - scrollYForTextAndButton) / 200).toFixed(1))
    }
    //// responsive showing seat
    const scrollYForSeatFloor = innerHeight * 0.95 - 337
    if (model.scrollY <= scrollYForSeatFloor) {
        seat.style.display = 'none'
    } else if (model.scrollY > scrollYForSeatFloor && model.scrollY <= innerHeight) {
        scrollYForSeat = model.scrollY - scrollYForSeatFloor
        seat.style.display = 'block'
        seat.style.position = 'fixed'
        seat.style.opacity = scrollYForSeat / (innerHeight - scrollYForSeatFloor)
    } else {
        seat.style.opacity = 1
        seat.style.display = 'block'
        seat.style.position = 'absolute'
    }

    //// responsive showing scroll icon
    if (model.scrollY <= innerHeight / 5) {
        scrollIcon.className = `appearingAnimation`
    } else {
        scrollIcon.className = `fadingAnimation`
    }
}
view.autoPlayVideo = () => {
    model.bgVideoSrc()
    backgroundVideo.volume = 0
    backgroundVideo.onended = () => {controller.changeVideoSrc()}
}
view.playSoundVideo = () => {
    backgroundVideo.volume = 1
    if (model.layerAnimation != undefined) clearInterval(model.layerAnimation)
    if (innerWidth > 769) {
        logo4dx.style.top = `20vh`
        header4dx.style.top = `calc(20vh + 148px)`
        text4dx.style.top = `calc(20vh + 208px)`
        button4dx.style.top = `calc(20vh + 314px)`
        model.layerAnimation = setInterval(() => {
            button4dx.style.left = `${model.layerStyleLeft}vw`
            if (model.layerStyleLeft <= -10) text4dx.style.left = `${model.layerStyleLeft + 20}vw`
            if (model.layerStyleLeft <= -30) header4dx.style.left = `${model.layerStyleLeft + 40}vw`
            if (model.layerStyleLeft <= -50) logo4dx.style.left = `${model.layerStyleLeft + 60}vw`
            model.layerStyleLeft -= 2

            layer4dx.style.opacity = model.layerStyleOpacity
            model.layerStyleOpacity -= 0.02

            if (model.layerStyleLeft <= -100) {
                layer4dx.style.opacity = 0
                model.layerStyleOpacity = 0
                layer4dx.style.zIndex = -1
                clearInterval(model.layerAnimation)
                model.layerAnimation = undefined
            }
        }, 10)
    } else if (innerWidth > 481) {
        model.layerAnimation = setInterval(() => {
            logo4dx.style.top = `${model.layerStyleTop}vh`
            if (model.layerStyleTop <= -10) header4dx.style.top = `${model.layerStyleTop + 20}vh`
            if (model.layerStyleTop <= -30) text4dx.style.top = `${model.layerStyleTop + 40}vh`
            if (model.layerStyleTop <= -50) button4dx.style.top = `${model.layerStyleTop + 60}vh`
            model.layerStyleTop -= 1

            layer4dx.style.opacity = model.layerStyleOpacity
            model.layerStyleOpacity -= 0.02

            if (model.layerStyleTop <= -100) {
                layer4dx.style.opacity = 0
                model.layerStyleOpacity = 0
                layer4dx.style.zIndex = -1
                clearInterval(model.layerAnimation)
                model.layerAnimation = undefined
            }
        }, 10)
    } else {
        logo4dx.style.left = `calc(50vw - 101px)`
        header4dx.style.left = `calc(50vw - 239px)`
        text4dx.style.left = `0`
        button4dx.style.left = `calc(50vw - 100px)`

        logo4dx.style.top = `30px`
        header4dx.style.top = `120px`
        text4dx.style.top = `150px`
        button4dx.style.top = `210px`
        layer4dx.style.opacity = model.layerStyleOpacity
        model.layerAnimation = setInterval(() => {
            playVideoBtn.style.opacity = model.layerStyleOpacity
            model.layerStyleOpacity -= 0.02
            if (model.layerStyleOpacity <= 0) {
                playVideoBtn.style.opacity = 0
                model.layerStyleOpacity = 0
                layer4dx.style.zIndex = 1
                clearInterval(model.layerAnimation)
                model.layerAnimation = undefined
            }
        }, 10)
    }
}
view.muteSoundVideo = () => {
    backgroundVideo.volume = 0
    if (model.layerAnimation != undefined) clearInterval(model.layerAnimation)
    if (innerWidth > 769) {
        layer4dx.style.zIndex = 1
        logo4dx.style.top = `20vh`
        header4dx.style.top = `calc(20vh + 148px)`
        text4dx.style.top = `calc(20vh + 208px)`
        button4dx.style.top = `calc(20vh + 314px)`
        model.layerStyleLeft = -100
        model.layerAnimation = setInterval(() => {
            if (model.layerStyleLeft <= 10) button4dx.style.left = `${model.layerStyleLeft}vw`
            if (model.layerStyleLeft + 20 <= 10) text4dx.style.left = `${model.layerStyleLeft + 20}vw`
            if (model.layerStyleLeft + 40 <= 10) header4dx.style.left = `${model.layerStyleLeft + 40}vw`
            if (model.layerStyleLeft + 60 <= 10) logo4dx.style.left = `${model.layerStyleLeft + 60}vw`
            layer4dx.style.opacity = model.layerStyleOpacity
            model.layerStyleOpacity += 0.02
            if (model.layerStyleLeft >= 10) {
                layer4dx.style.opacity = 1
                model.layerStyleOpacity = 1
                clearInterval(model.layerAnimation)
                model.layerAnimation = undefined
            }
            model.layerStyleLeft += 2
        }, 10)
    } else if (innerWidth > 481) {
        layer4dx.style.zIndex = 1
        logo4dx.style.left = `calc(50vw - 131px)`
        header4dx.style.left = `calc(50vw - 250px)`
        text4dx.style.left = `calc(50vw - 205px)`
        button4dx.style.left = `calc(50vw - 125px)`
        model.layerStyleTop = -100
        model.layerAnimation = setInterval(() => {
            logo4dx.style.top = `${model.layerStyleTop + 1}vh`
            if (model.layerStyleTop + 20 <= 10) header4dx.style.top = `calc(${model.layerStyleTop + 20}vh + 114px)`
            if (model.layerStyleTop + 40 <= 10) text4dx.style.top = `calc(${model.layerStyleTop + 40}vh + 154px)`
            if (model.layerStyleTop + 60 <= 10) button4dx.style.top = `calc(${model.layerStyleTop + 60}vh + 224px)`
            model.layerStyleTop += 1

            layer4dx.style.opacity = model.layerStyleOpacity
            model.layerStyleOpacity += 0.02

            if (model.layerStyleTop >= 10) {
                layer4dx.style.opacity = 1
                model.layerStyleOpacity = 1
                clearInterval(model.layerAnimation)
                model.layerAnimation = undefined
            }
        }, 10)
    } else {
        logo4dx.style.left = `calc(50vw - 101px)`
        header4dx.style.left = `calc(50vw - 239px)`
        text4dx.style.left = `0`
        button4dx.style.left = `calc(50vw - 100px)`

        logo4dx.style.top = `30px`
        header4dx.style.top = `120px`
        text4dx.style.top = `150px`
        button4dx.style.top = `210px`
        layer4dx.style.opacity = 1
        model.layerAnimation = setInterval(() => {
            playVideoBtn.style.opacity = model.layerStyleOpacity
            model.layerStyleOpacity += 0.02
            if (model.layerStyleOpacity >= 1) {
                model.layerStyleOpacity = 1
                playVideoBtn.style.opacity = 1
                layer4dx.style.zIndex = 3
                clearInterval(model.layerAnimation)
                model.layerAnimation = undefined
            }
        }, 10)
    }
}
view.buttonActive = button => {
    button.classList.add('buttonActive')
    button.parentElement.classList.add('spanActive')
}
view.buttonInactive = button => {
    button.classList.remove('buttonActive')
    button.parentElement.classList.remove('spanActive')
}
view.changeText = (text) => {
    if (textContainer.innerText != text) {
        if (model.changeText != undefined) clearInterval(model.changeText)
        let changeStage = 0
        model.changeText = setInterval(() => {
            if (changeStage == 0) {
                model.textOpacity -= 0.01
                if (model.textOpacity <= 0) {
                    changeStage = 1
                    textContainer.innerText = text
                }
                textContainer.style.color = `rgba(255, 255, 255, ${Number(model.textOpacity.toFixed(2))})`
            } else {
                model.textOpacity += 0.01
                if (model.textOpacity >= 1) {
                    clearInterval(model.changeText)
                }
                textContainer.style.color = `rgba(255, 255, 255, ${Number(model.textOpacity.toFixed(2))})`
            }
        }, 10)
    }
}
view.clearCurrentEffect = () => {
    view.changeText(components.mainButton)
    if (model.currentEffect === 0 || model.currentEffect === 1 || model.currentEffect === 2) {
        const seatModel = document.getElementsByClassName('seatModel')
        screen[1].removeChild(seatModel[3])
        screen[1].removeChild(seatModel[2])
        screen[1].removeChild(seatModel[1])
        screen[1].removeChild(seatModel[0])
        if (model.currentEffect === 0) {
            buttonIcon[0].onclick = () => { view.setShakeEffect() }
            view.buttonInactive(buttonIcon[0])
        }
        if (model.currentEffect === 1) {
            buttonIcon[1].onclick = () => { view.setMoveEffect() }
            view.buttonInactive(buttonIcon[1])
        }
        if (model.currentEffect === 2) {
            buttonIcon[2].onclick = () => { view.setTickleEffect() }
            view.buttonInactive(buttonIcon[2])
        }
    } else if (model.currentEffect === 3) {

        view.buttonInactive(buttonIcon[3])
        clearInterval(model.layerDrawing)
        buttonIcon[3].onclick = () => { view.setSpitEffect() }

    } else if (model.currentEffect === 4) {

        view.buttonInactive(buttonIcon[4])
        clearInterval(model.layerDrawing)
        clearInterval(model.changeEffectWind)
        buttonIcon[4].onclick = () => { view.setRainEffect() }

    } else if (model.currentEffect === 5) {

        view.buttonInactive(buttonIcon[5])
        clearInterval(model.layerDrawing)
        clearInterval(model.changeEffectWind)
        buttonIcon[5].onclick = () => { view.setBubleEffect() }

    } else if (model.currentEffect === 6) {

        view.buttonInactive(buttonIcon[6])
        clearInterval(model.layerDrawing)
        const airFlow = document.getElementsByClassName('airFlow')
        for (let i = 1; i > -1; --i) {
            airFlow[i].parentElement.removeChild(airFlow[i])
        }
        const airCondition = document.getElementById('airCondition')
        airConditionTop = 0
        airConditionOpacity = .8
        model.clearAnimation = setInterval(() => {
            airConditionTop -= 0.5
            airConditionOpacity -= 0.02
            airCondition.style.top = `${Number(airConditionTop.toFixed(1))}px`
            airCondition.style.opacity = `${Number(airConditionOpacity.toFixed(1))}`
            if (airConditionOpacity <= 0) {
                airCondition.parentElement.removeChild(airCondition)
                clearInterval(model.clearAnimation)
                buttonIcon[6].onclick = () => { view.setAirEffect() }
                model.clearAnimation = undefined
            }
        }, 10)

    } else if (model.currentEffect === 7) {

        view.buttonInactive(buttonIcon[7])
        clearInterval(model.layerDrawing)
        let layerStyleOpacity = 1
        model.clearAnimation = setInterval(() => {
            effectFrontLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            effectBackLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            layerStyleOpacity -= 0.01
            if (layerStyleOpacity <= 0) {
                effectFrontLayer.innerHTML = ``
                effectBackLayer.innerHTML = ``
                effectFrontLayer.style.opacity = 1
                effectBackLayer.style.opacity = 1
                clearInterval(model.clearAnimation)
                buttonIcon[7].onclick = () => { view.setLightEffect() }
                model.clearAnimation = undefined
            }
        }, 10)

    } else if (model.currentEffect === 8) {

        view.buttonInactive(buttonIcon[8])
        clearInterval(model.layerDrawing)
        let layerStyleOpacity = 1
        model.clearAnimation = setInterval(() => {
            effectFrontLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            effectBackLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            layerStyleOpacity -= 0.01
            if (layerStyleOpacity <= 0) {
                effectFrontLayer.innerHTML = ``
                effectBackLayer.innerHTML = ``
                effectFrontLayer.style.opacity = 1
                effectBackLayer.style.opacity = 1
                clearInterval(model.clearAnimation)
                buttonIcon[8].onclick = () => { view.setWindEffect() }
                model.clearAnimation = undefined
            }
        }, 10)


    } else if (model.currentEffect === 9) {

        view.buttonInactive(buttonIcon[9])
        buttonIcon[9].onclick = () => { view.setSmellEffect() }
        clearInterval(model.layerDrawing)
        let layerStyleOpacity = 1
        model.clearAnimation = setInterval(() => {
            effectFrontLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            effectBackLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            layerStyleOpacity -= 0.01
            if (layerStyleOpacity <= 0) {
                const dandelion = document.getElementById('dandelion')
                const dandelionLights = document.getElementsByClassName('dandelionLightStay')
                for (let i = dandelionLights.length - 1; i > -1; --i) {
                    dandelionLights[i].parentElement.removeChild(dandelionLights[i])
                }
                effectFrontLayer.removeChild(dandelion)
                effectBackLayer.innerHTML = ``
                effectFrontLayer.style.opacity = 1
                effectBackLayer.style.opacity = 1
                clearInterval(model.clearAnimation)
                buttonIcon[10].onclick = () => { view.setFogEffect() }
                model.clearAnimation = undefined
            }
        }, 10)

    } else if (model.currentEffect === 10) {

        view.buttonInactive(buttonIcon[10])
        clearInterval(model.layerDrawing)
        let layerStyleOpacity = 1
        model.clearAnimation = setInterval(() => {
            effectFrontLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            effectBackLayer.style.opacity = Number(layerStyleOpacity.toFixed(2))
            layerStyleOpacity -= 0.01
            if (layerStyleOpacity <= 0) {
                effectFrontLayer.innerHTML = ``
                effectBackLayer.innerHTML = ``
                effectFrontLayer.style.opacity = 1
                effectBackLayer.style.opacity = 1
                clearInterval(model.clearAnimation)
                buttonIcon[10].onclick = () => { view.setFogEffect() }
                model.clearAnimation = undefined
            }
        }, 10)

    }
    model.currentEffect = undefined
}
view.setShakeEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[0])
    buttonIcon[0].onclick = () => {
        view.clearCurrentEffect()
        seat.style.animation = ``
    }
    model.currentEffect = 0
    // textContainer.innerText = components.shakeButton
    view.changeText(components.shakeButton)
    const seatEffectModel = document.createElement('div')
    const seatEffectDuplicate = document.createElement('div')
    const seatEffectTriplicate = document.createElement('div')
    const seatEffectQuartlicate = document.createElement('div')
    seatEffectModel.className = `seatModel`
    seatEffectDuplicate.className = `seatModel`
    seatEffectTriplicate.className = `seatModel`
    seatEffectQuartlicate.className = `seatModel`
    seatEffectModel.style.filter = `brightness(1.5) opacity(.5)`
    seatEffectDuplicate.style.filter = `brightness(2) opacity(.3)`
    seatEffectTriplicate.style.filter = `brightness(3) opacity(.1)`
    seatEffectQuartlicate.style.filter = `brightness(1.1) opacity(.5)`
    seatEffectQuartlicate.style.zIndex = 3
    screen[1].appendChild(seatEffectModel)
    screen[1].appendChild(seatEffectDuplicate)
    screen[1].appendChild(seatEffectTriplicate)
    screen[1].appendChild(seatEffectQuartlicate)
    seat.style.animation = `shake 1s infinite ease-in-out 1s`
    seatEffectModel.style.animation = `shake 1s infinite ease-in-out 1.06s`
    seatEffectDuplicate.style.animation = `shake 1s infinite ease-in-out 1.12s`
    seatEffectTriplicate.style.animation = `shake 1s infinite ease-in-out 1.18s`
    seatEffectQuartlicate.style.animation = `shake 1s infinite ease-in-out 1.06s`
}
view.setMoveEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[1])
    buttonIcon[1].onclick = () => {
        view.clearCurrentEffect()
        seat.style.animation = ``
    }
    model.currentEffect = 1
    view.changeText(components.moveButton)
    const seatEffectModel = document.createElement('div')
    const seatEffectDuplicate = document.createElement('div')
    const seatEffectTriplicate = document.createElement('div')
    const seatEffectQuartlicate = document.createElement('div')
    seatEffectModel.className = `seatModel`
    seatEffectDuplicate.className = `seatModel`
    seatEffectTriplicate.className = `seatModel`
    seatEffectQuartlicate.className = `seatModel`
    seatEffectModel.style.filter = `brightness(1.25) opacity(.5)`
    seatEffectDuplicate.style.filter = `brightness(1.5) opacity(.3)`
    seatEffectTriplicate.style.filter = `brightness(2) opacity(.2)`
    seatEffectQuartlicate.style.filter = `brightness(3) opacity(.1)`
    screen[1].appendChild(seatEffectModel)
    screen[1].appendChild(seatEffectDuplicate)
    screen[1].appendChild(seatEffectTriplicate)
    screen[1].appendChild(seatEffectQuartlicate)
    seat.style.animation = `move 3s infinite ease-in-out 1s`
    seatEffectModel.style.animation = `move 3s infinite ease-in-out 1.04s`
    seatEffectDuplicate.style.animation = `move 3s infinite ease-in-out 1.08s`
    seatEffectTriplicate.style.animation = `move 3s infinite ease-in-out 1.14s`
    seatEffectQuartlicate.style.animation = `move 3s infinite ease-in-out 1.2s`
}
view.setTickleEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[2])
    buttonIcon[2].onclick = () => {
        view.clearCurrentEffect()
        seat.style.animation = ``
    }
    model.currentEffect = 2
    view.changeText(components.tickleButton)
    const seatEffectModel = document.createElement('div')
    const seatEffectDuplicate = document.createElement('div')
    const seatEffectTriplicate = document.createElement('div')
    const seatEffectQuartlicate = document.createElement('div')
    seatEffectModel.className = `seatModel`
    seatEffectDuplicate.className = `seatModel`
    seatEffectTriplicate.className = `seatModel`
    seatEffectQuartlicate.className = `seatModel`
    seatEffectModel.style.filter = `brightness(1.25) opacity(.5)`
    seatEffectDuplicate.style.filter = `brightness(1.5) opacity(.3)`
    seatEffectTriplicate.style.filter = `brightness(2) opacity(.2)`
    seatEffectQuartlicate.style.filter = `brightness(3) opacity(.1)`
    screen[1].appendChild(seatEffectModel)
    screen[1].appendChild(seatEffectDuplicate)
    screen[1].appendChild(seatEffectTriplicate)
    screen[1].appendChild(seatEffectQuartlicate)
    seat.style.animation = `tickle 2s infinite ease-in-out 1s`
    seatEffectModel.style.animation = `tickle 2s infinite ease-in-out 1.03s`
    seatEffectDuplicate.style.animation = `tickle 2s infinite ease-in-out 1.06s`
    seatEffectTriplicate.style.animation = `tickle 2s infinite ease-in-out 1.09s`
    seatEffectQuartlicate.style.animation = `tickle 2s infinite ease-in-out 1.12s`
}
view.setSpitEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[3])
    controller.removeButton
    view.changeText(components.spitButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[3].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 3
            model.layerDrawing = setInterval(() => {
                manyFrontLeftDrops = Math.floor(Math.random() * 1) + 1
                for (let i = 0; i < manyFrontLeftDrops; i++) {
                    controller.createHumidDrop('left', effectFrontLayer)
                }
                manyFrontRightDrops = Math.floor(Math.random() * 1) + 1
                for (let i = 0; i < manyFrontRightDrops; i++) {
                    controller.createHumidDrop('right', effectFrontLayer)
                }
            }, 20);
        }
    }, 10)

}
view.setRainEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[4])
    controller.removeButton()
    view.changeText(components.rainButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[4].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 4
            model.layerDrawing = setInterval(() => {
                const manyFrontRainDrop = Math.floor(Math.random() * 3 + 2)
                for (let i = 0; i < manyFrontRainDrop; ++i) {
                    controller.dropFrontRainDrop()
                }
                const manyBackRainDrop = Math.floor(Math.random() * 10 + 5)
                for (let i = 0; i < manyBackRainDrop; ++i) {
                    controller.dropBackRainDrop()
                }
            }, 100)
            controller.runWindEffection(2000)
        }
    }, 10)
}
view.setBubleEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[5])
    controller.removeButton()
    view.changeText(components.bubleButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[5].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 5
            model.layerDrawing = setInterval(() => {
                manyBuble = Math.floor(Math.random() * 1 + 1)
                for (let i = 0; i < manyBuble; ++i) {
                    controller.createBuble()
                }
            }, 200);
            controller.runWindEffection(1000)
        }
    }, 10)
}
view.setAirEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[6])
    controller.removeButton()
    view.changeText(components.airButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[6].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 6
            const airCondition = document.createElement('div')
            airCondition.id = `airCondition`
            effectFrontLayer.appendChild(airCondition)

            const airFlowBack = document.createElement('div')
            airFlowBack.className = `airFlow`
            airFlowBack.style.animation = `airFlow 4s infinite ease-in-out 2s`
            effectBackLayer.appendChild(airFlowBack)

            const airFlowFront = document.createElement('div')
            airFlowFront.className = `airFlow`
            airFlowFront.style.animation = `airFlow 4s infinite ease-in-out 4s`
            effectFrontLayer.appendChild(airFlowFront)

            model.layerDrawing = setInterval(() => {
                const manyFreshAir = Math.floor(Math.random() * 1 + 1)
                for (let i = 0; i < manyFreshAir; ++i) {
                    controller.moveFreshAir()
                }
            }, 200)
        }
    }, 10)

}
view.setLightEffect = () => {
    view.clearCurrentEffect()
    controller.removeButton()
    view.buttonActive(buttonIcon[7])
    view.changeText(components.lightButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[7].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 7
            const lightRay = document.createElement('div')
            lightRay.id = `lightRay`
            effectFrontLayer.appendChild(lightRay)
            for (let i = 0; i < 2; ++i) {
                const stadiumLight = document.createElement('div')
                stadiumLight.className = `stadiumLights`
                const bgLight = document.createElement('div')
                bgLight.className = `bgLights`
                if (i === 0) {
                    stadiumLight.style.left = 0
                    stadiumLight.style.transform = `rotateY(180deg)`
                    bgLight.style.left = 0
                    bgLight.style.transform = `rotateY(180deg)`
                } else if (i === 1) {
                    stadiumLight.style.right = 0
                    bgLight.style.right = 0
                }
                effectBackLayer.appendChild(stadiumLight)
                effectBackLayer.appendChild(bgLight)
            }
            controller.lightenLight()
        }
    }, 10)
}
view.setWindEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[8])
    controller.removeButton()
    view.changeText(components.windButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[8].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 8
            for (let i = 0; i < 2; ++i) {
                const fan = document.createElement('div')
                fan.className = `fans`
                if (i === 0) fan.style.left = `20px`
                else fan.style.right = `20px`
                effectFrontLayer.appendChild(fan)
                const airWave = document.createElement('div')
                airWave.className = `airWaves`
                if (i === 0) airWave.style.left = `20px`
                else airWave.style.right = `20px`
                effectBackLayer.appendChild(airWave)
            }
            controller.bringFansAndAirWaves()
        }
    }, 10)
}
view.setSmellEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[9])
    controller.removeButton()
    view.changeText(components.smellButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[9].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 9
            for (let i = 1; i < 5; ++i) {
                const smell = document.createElement('div')
                smell.className = `smells`
                smell.id = `smell${i}`
                effectBackLayer.appendChild(smell)
            }
            const dandelion = document.createElement('div')
            dandelion.id = `dandelion`
            dandelion.style.animation = `dandelionAppear 4s ease-in-out`
            effectFrontLayer.appendChild(dandelion)
            controller.dandelionSmell()
        }
    }, 10)
}
view.setFogEffect = () => {
    view.clearCurrentEffect()
    view.buttonActive(buttonIcon[10])
    controller.removeButton()
    view.changeText(components.cloudButton)
    const waitingClear = setInterval(() => {
        if (model.clearAnimation === undefined) {
            clearInterval(waitingClear)
            controller.addButton()
            buttonIcon[10].onclick = () => { view.clearCurrentEffect() }
            seat.style.animation = ``
            model.currentEffect = 10
            const cloudBack = document.createElement('div')
            cloudBack.id = `cloudBack`
            effectBackLayer.appendChild(cloudBack)
            const cloudFront = document.createElement('div')
            cloudFront.id = `cloudFront`
            effectFrontLayer.appendChild(cloudFront)
            for (let i = 0; i < 4; ++i) {
                const cloudMoveFront = document.createElement('div')
                cloudMoveFront.className = `cloudFronts`
                controller.moveCloud(cloudMoveFront, i, i % 2)
            }
        }
    }, 10)
}


//// controller contains logic functions
const controller = {}
controller.changeVideoSrc = () => {
    if (model.bgVideoCurrentSrc < 13) ++model.bgVideoCurrentSrc
    else model.bgVideoCurrentSrc = 0
    model.bgVideoSrc()
}
controller.runWindEffection = (callBackTiming) => {
    let callBackWindChangeTime = callBackTiming
    model.effectWindChange = setInterval(() => {
        const volume = Number((Math.random() * 0.05 - 0.025).toFixed(2))
        const oldEffectWind = model.effectWind
        let newEffectWind = model.effectWind + volume
        if (newEffectWind > 0.12) newEffectWind = 0.12
        else if (newEffectWind < -0.12) newEffectWind = -0.12
        const changeEffectWind = setInterval(() => {
            if (oldEffectWind >= newEffectWind) {
                model.effectWind -= 0.005
                if (model.effectWind <= newEffectWind) {
                    model.effectWind = newEffectWind
                    clearInterval(changeEffectWind)
                }
            }
            else if (oldEffectWind < newEffectWind) {
                model.effectWind += 0.005
                if (model.effectWind >= newEffectWind) {
                    model.effectWind = newEffectWind
                    clearInterval(changeEffectWind)
                }
            }
        }, 100);
        callBackWindChangeTime = Math.floor(Math.random() * 3000 + 2000)
    }, callBackWindChangeTime);
}
controller.createHumidDrop = (side, layerElement) => {
    const drop = document.createElement('div')
    const dropSize = Number((Math.random() * 2 + 2).toFixed(1))
    drop.className = 'humidDrops'
    drop.style.height = `${dropSize}px`
    drop.style.width = `${dropSize}px`
    drop.style.opacity = 0
    layerElement.appendChild(drop)
    moveY = Number((Math.random() * 4 + 2).toFixed(2))
    if (side === 'left') {
        moveX = Number((4 / moveY).toFixed(2))
        controller.spitDrop(0, moveX, moveY, drop, dropSize)
    } else if (side === 'right') {
        moveX = Number((-4 / moveY).toFixed(2))
        controller.spitDrop(100, moveX, moveY, drop, dropSize)
    }
}
controller.spitDrop = (moveXFloor, moveX, moveY, drop, dropSize) => {
    let dropPostionX = moveXFloor
    let dropPostionY = 0
    let dropMoveStage = 'up'
    let dropOpacity = 0.7
    const spitDropAnimation = setInterval(() => {
        dropPostionX = Number((moveX + dropPostionX).toFixed(2))
        dropPostionY = Number((moveY + dropPostionY).toFixed(2))

        drop.style.bottom = `${dropPostionY}vh`
        drop.style.left = `${dropPostionX}vw`
        if (dropMoveStage === 'up') {
            moveY -= 0.06 * moveY

            dropOpacity -= 0.03
            if (dropOpacity <= 0.5) dropOpacity = 0.5
            drop.style.opacity = Number(dropOpacity.toFixed(1))

            dropSize += 0.1
            if (dropSize > 6) dropSize = 3
            drop.style.height = `${Number(dropSize.toFixed(1))}px`
            drop.style.width = `${Number(dropSize.toFixed(1))}px`

            moveX -= 0.03 * moveX
            if (moveX > 0 && moveX <= 0.5) moveX = 0.5
            else if (moveX < 0 && moveX >= -0.5) moveX = -0.5

        } else {
            moveY += 0.02 * moveY


            dropOpacity -= 0.05
            if (dropOpacity <= 0.2) dropOpacity = 0.5
            drop.style.opacity = Number(dropOpacity.toFixed(1))

            dropSize += 0.3
            if (dropSize > 4) dropSize = 1
            drop.style.height = `${Number(dropSize.toFixed(1))}px`
            drop.style.width = `${Number(dropSize.toFixed(1))}px`

            moveX -= 0.06 * moveX
            if (moveX > 0 && moveX <= 0.4) moveX = 0.4
            else if (moveX < 0 && moveX >= -0.4) moveX = -0.4

        }
        if (moveY <= 0.005 && dropMoveStage === 'up') {
            moveY = -0.005
            dropMoveStage = 'down'
        }
        if (dropPostionY >= 100 || dropPostionY <= 0 || dropPostionX >= 100 || dropPostionX <= 0) {
            drop.parentElement.removeChild(drop)
            clearInterval(spitDropAnimation)
        }

    }, 20)

}
controller.dropFrontRainDrop = () => {
    const rainDrop = document.createElement('div')
    rainDrop.className = `rainingDrops`
    let rainDropHeight = Math.floor(Math.random() * 15 + 10)
    let rainDropWidth = Math.floor(Math.random() * 2 + 1)
    if (model.effectWind > 0) {
        var rainDropLeft = Math.floor(Math.random() * (innerWidth + innerWidth / 3) - innerWidth / 3)
    } else if (model.effectWind < 0) {
        var rainDropLeft = Math.floor(Math.random() * (innerWidth + innerWidth / 3))
    } else {
        var rainDropLeft = Math.floor(Math.random() * innerWidth)
    }
    let rainDropTop = Math.floor(Math.random() * innerHeight / 5)

    let rainDropOpacity = 0
    rainDrop.style.opacity = rainDropOpacity
    rainDrop.style.height = `${rainDropHeight}px`
    rainDrop.style.width = `${rainDropWidth}px`
    effectFrontLayer.appendChild(rainDrop)
    const dropFrontRainDrop = setInterval(() => {
        rainDropTop += 6 * ((rainDropHeight / 10) + 1) / 2
        rainDropLeft += model.effectWind * 50
        rainDropOpacity += 0.05
        if (rainDropOpacity >= .6) rainDropOpacity = .6
        rainDrop.style.left = `${Number(rainDropLeft.toFixed(1))}px`
        rainDrop.style.top = `${Number(rainDropTop.toFixed(1))}px`
        rainDrop.style.transform = `rotate(${Math.floor(-45 * model.effectWind / (0.12 * rainDropHeight / 10))}deg)`
        rainDrop.style.opacity = Number(rainDropOpacity.toFixed(1))
        if (rainDropTop >= innerHeight) {
            clearInterval(dropFrontRainDrop)
            rainDrop.parentElement.removeChild(rainDrop)
        }
    }, 10)

}
controller.dropBackRainDrop = () => {
    const rainDrop = document.createElement('div')
    rainDrop.className = `rainingDrops`
    let rainDropHeight = Math.floor(Math.random() * 5 + 5)
    let rainDropLeft = Math.floor(Math.random() * innerWidth * 2 - innerWidth)
    let rainDropTop = Math.floor(Math.random() * innerHeight / 10)
    let rainDropOpacity = 0
    rainDrop.style.opacity = rainDropOpacity
    rainDrop.style.height = `${rainDropHeight}px`
    rainDrop.style.width = `1px`
    effectBackLayer.appendChild(rainDrop)
    const dropBackRainDrop = setInterval(() => {
        rainDropTop += 9.6 * ((rainDropHeight / 5) + 1) / 2
        rainDropLeft += model.effectWind * 80
        rainDropOpacity += 0.05
        if (rainDropOpacity >= .8) rainDropOpacity = .8
        rainDrop.style.left = `${Number(rainDropLeft.toFixed(1))}px`
        rainDrop.style.top = `${Number(rainDropTop.toFixed(1))}px`
        rainDrop.style.transform = `rotate(${Math.floor(-45 * model.effectWind / (0.12 * rainDropHeight / 5))}deg)`
        rainDrop.style.opacity = Number(rainDropOpacity.toFixed(1))
        if (rainDropTop >= innerHeight) {
            clearInterval(dropBackRainDrop)
            rainDrop.parentElement.removeChild(rainDrop)
        }
    }, 10)

}
controller.createBuble = () => {
    const buble = {}
    buble.kind = Math.floor(Math.random() * 3 + 1)
    buble.size = Math.floor(Math.random() * 50 + 10)
    if (model.effectWind > 0 && model.effectWind < 0.1) buble.positionX = Math.floor(Math.random() * innerWidth / 1.3)
    else if (model.effectWind >= 0.1) buble.positionX = Math.floor(Math.random() * innerWidth / 1.4)
    else if (model.effectWind < 0 && model.effectWind > -0.1) buble.positionX = Math.floor(Math.random() * innerWidth / 1.3 + innerWidth - innerWidth / 1.3)
    else if (model.effectWind <= -0.1) buble.positionX = Math.floor(Math.random() * innerWidth / 1.4 + innerWidth - innerWidth / 1.4)
    else buble.positionX = Math.floor(Math.random() * innerWidth + 1)
    buble.positionY = 0
    buble.opacity = 0.1
    buble.element = document.createElement('div')
    buble.element.className = `bubles`
    buble.element.style.backgroundImage = `url(../4DX/images/bongBong${buble.kind}.png)`
    effectFrontLayer.appendChild(buble.element)
    controller.flyBuble(buble)
}
controller.flyBuble = (buble) => {
    const flyBubleAnimation = setInterval(() => {
        buble.positionX += model.effectWind * buble.size
        buble.positionY += buble.size * 0.05
        buble.size += 0.005 * buble.size
        if (buble.positionY < innerHeight && buble.positionX < innerWidth && buble.positionX > 0) {
            buble.opacity += 0.005
            if (buble.opacity > .75) buble.opacity = .75
        } else {
            buble.opacity -= 0.02
            if (buble.opacity <= 0) {
                clearInterval(flyBubleAnimation)
                buble.element.parentElement.removeChild(buble.element)
            }
        }
        buble.element.style.opacity = `${Number(buble.opacity.toFixed(1))}`
        buble.element.style.width = `${Number(buble.size.toFixed(1))}px`
        buble.element.style.height = `${Number(buble.size.toFixed(1))}px`
        buble.element.style.left = `${Math.round(buble.positionX - Number(buble.size.toFixed(1)))}px`
        buble.element.style.bottom = `${Math.round(buble.positionY - Number(buble.size.toFixed(1)))}px`
    }, 10);
}
controller.moveFreshAir = () => {
    const freshAir = document.createElement('div')
    freshAir.className = `freshAir`
    let freshAirPositionX = Math.floor(innerWidth / 2 + Math.random() * 480 - 240)
    let freshAirPositionY = 80
    let freshAirOpacity = 0
    freshAir.style.opacity = `${Number(freshAirOpacity.toFixed(1))}`
    effectFrontLayer.appendChild(freshAir)
    const movingFreshAir = setInterval(() => {
        freshAir.style.left = `${Number(freshAirPositionX.toFixed(1))}px`
        freshAir.style.top = `${Number(freshAirPositionY.toFixed(1))}px`
        freshAir.style.opacity = `${Number(freshAirOpacity.toFixed(1))}`
        ++freshAirPositionY
        if (freshAirPositionX < innerWidth / 2 - 80) {
            freshAirPositionX -= 0.4

            freshAir.style.transform = `rotate(${Math.floor((innerWidth / 2 - freshAirPositionX) * 90 / innerWidth)}deg)`
        }
        else if (freshAirPositionX > innerWidth / 2 - 80 && freshAirPositionX < innerWidth / 2 - 50) {
            freshAirPositionX -= 0.3
            freshAir.style.transform = `rotate(${Math.floor((innerWidth / 2 - freshAirPositionX) * 90 / innerWidth)}deg)`
        }
        else if (freshAirPositionX > innerWidth / 2 - 50 && freshAirPositionX < innerWidth / 2 - 10) {
            freshAirPositionX -= 0.2
            freshAir.style.transform = `rotate(${Math.floor((innerWidth / 2 - freshAirPositionX) * 90 / innerWidth)}deg)`
        }
        else if (freshAirPositionX > innerWidth / 2 + 80) {
            freshAirPositionX += 0.4
            freshAir.style.transform = `rotate(${Math.floor((innerWidth / 2 - freshAirPositionX) * 90 / innerWidth)}deg)`
        }
        else if (freshAirPositionX < innerWidth / 2 + 80 && freshAirPositionX > innerWidth / 2 + 50) {
            freshAirPositionX += 0.3
            freshAir.style.transform = `rotate(${Math.floor((innerWidth / 2 - freshAirPositionX) * 90 / innerWidth)}deg)`
        }
        else if (freshAirPositionX < innerWidth / 2 + 50 && freshAirPositionX > innerWidth / 2 + 10) {
            freshAirPositionX += 0.2
            freshAir.style.transform = `rotate(${Math.floor((innerWidth / 2 - freshAirPositionX) * 90 / innerWidth)}deg)`
        }
        if (freshAirPositionY <= 200) {
            freshAirOpacity += 0.005
            if (freshAirOpacity >= .1) freshAirOpacity = .1
        } else if (freshAirPositionY > innerHeight / 2 + innerHeight / 4) {
            freshAirOpacity -= 0.1
            if (freshAirOpacity <= 0) {
                clearInterval(movingFreshAir)
                freshAirOpacity = 0
                freshAir.parentElement.removeChild(freshAir)
            }
        }
    }, 10)
}
controller.lightenLight = () => {
    const stadiumLights = document.getElementsByClassName('stadiumLights')
    const bgLights = document.getElementsByClassName('bgLights')
    for (let i = 0; i < 2; ++i) {
        stadiumLights[i].style.backgroundImage = `url(../4DX/images/111.png)`;
    }
    let bgLightOpacity = 0
    let callBackTiming = 1500
    let lightOff = 0
    model.layerDrawing = setInterval(() => {
        let newBgLightOpacity = bgLightOpacity
        let lightOn = Math.floor(Math.random() * 4 + 1)
        while (true) {
            if (lightOff === lightOn) lightOn = Math.floor(Math.random() * 4 + 1)
            else break
        }
        lightOff = lightOn
        bgLightOpacity = 0
        for (let i = 0; i < 2; ++i) {
            stadiumLights[i].style.backgroundImage = `url(../4DX/images/111.png)`
            stadiumLights[i].style.opacity = 0
        }

        callBackTiming = Number((Math.random() * 20 + 10).toFixed(0))
        if (lightOn === 4) callBackTiming = Number((Math.random() * 0.2 + 0.2).toFixed(2)) * 1000
        changeAllLightOpacity = setTimeout(() => { for (let i = 0; i < 2; ++i) stadiumLights[i].style.opacity = .3 }, 10)

        if (lightOn === 1) {
            for (let i = 0; i < 2; ++i) stadiumLights[i].style.backgroundImage = `url(../4DX/images/011.png)`
            newBgLightOpacity = .3
        } else if (lightOn === 2) {
            for (let i = 0; i < 2; ++i) stadiumLights[i].style.backgroundImage = `url(../4DX/images/101.png)`
            newBgLightOpacity = .3
        } else if (lightOn === 3) {
            for (let i = 0; i < 2; ++i) stadiumLights[i].style.backgroundImage = `url(../4DX/images/110.png)`
            newBgLightOpacity = .3
        } else if (lightOn === 4) {
            for (let i = 0; i < 2; ++i) stadiumLights[i].style.backgroundImage = `url(../4DX/images/000.png)`
            newBgLightOpacity = .2
        }
        const changeBgLightOpacity = setInterval(() => {
            bgLightOpacity += .05
            for (let i = 0; i < 2; ++i) bgLights[i].style.opacity = `${Number(bgLightOpacity.toFixed(2))}`
            if (bgLightOpacity >= newBgLightOpacity) clearInterval(changeBgLightOpacity)
        }, 10)
    }, callBackTiming)
}
controller.bringFansAndAirWaves = () => {
    const fans = document.getElementsByClassName('fans')
    const airWaves = document.getElementsByClassName('airWaves')
    let elementOpacity = 0
    let elementRotate = 1
    let timeCount = 0
    model.layerDrawing = setInterval(() => {
        timeCount += 10
        if (elementOpacity < 1) {
            elementOpacity += 0.01
            for (let i = 0; i < 2; ++i) {
                fans[i].style.opacity = Number(elementOpacity.toFixed(1))
                airWaves[i].style.opacity = Number(elementOpacity.toFixed(1))
            }
        }
        if (elementOpacity > .5) {
            elementRotate *= 1.05
            for (let i = 0; i < 2; ++i) {
                fans[i].style.transform = `rotate(${Math.floor(elementRotate)}deg)`
                airWaves[i].style.transform = `rotateY(${elementRotate}deg)`
            }
        }
        if (timeCount >= 3000) {
            clearInterval(model.layerDrawing)
            model.layerDrawing = undefined
        }
    }, 10)
}
controller.dandelionSmell = () => {
    const dandelion = document.getElementById('dandelion')
    let timeCount = 0
    let timeEffect = 2000
    model.layerDrawing = setInterval(() => {
        timeCount += 10
        if (timeCount >= 3500) {
            dandelion.className = ``
            const dandelionLights = document.getElementsByClassName('dandelionLightStay')
            if (dandelionLights.length > 0) {
                const manyLightEffectStay = dandelionLights.length
                for (let i = 0; i < manyLightEffectStay; ++i) {
                    dandelionLights[dandelionLights.length - 1].parentElement.removeChild(dandelionLights[dandelionLights.length - 1])
                }
            }
        }
        if (timeCount >= timeEffect) {
            timeCount = 0
            timeEffect = Math.floor(Math.random() * 2000 + 3500)
            dandelion.style.animation = ``
            dandelion.className = `rotateDandelion`
            let manyLightEffectDrop = Math.floor(Math.random() * 20 + 20)
            for (let i = 0; i < manyLightEffectDrop; ++i) {
                const dandelionLight = document.createElement('div')
                dandelionLight.className = `dandelionLight`
                let dandelionLightBottom = Math.floor(Math.random() * 160 + 150)
                dandelionLight.style.bottom = `${dandelionLightBottom}px`
                dandelionLight.style.left = `${Math.floor(Math.random() * 220)}px`
                dandelionLight.style.animation = `dandelionLightDrop 3s infinite cubic-bezier(1,0,0,1) ${Number((Math.random() * 2).toFixed(1))}s`
                effectFrontLayer.appendChild(dandelionLight)
                const dropDownDandelionLight = setInterval(() => {
                    dandelionLightBottom -= 0.5
                    if (dandelionLightBottom <= 0) {
                        clearInterval(dropDownDandelionLight)
                        dandelionLight.parentElement.removeChild(dandelionLight)
                    }
                    dandelionLight.style.bottom = `${Number(dandelionLightBottom.toFixed(1))}px`
                }, 10)
            }
            let manyLightEffectStay = Math.floor(Math.random() * 10 + 20)
            for (let i = 0; i < manyLightEffectStay; ++i) {
                const dandelionLight = document.createElement('div')
                dandelionLight.className = `dandelionLight dandelionLightStay`
                dandelionLight.style.bottom = `${Math.floor(Math.random() * 125 + 175)}px`
                dandelionLight.style.left = `${Math.floor(Math.random() * 200 + 10)}px`
                dandelionLight.style.animation = `dandelionLightStay 2s infinite cubic-bezier(1,0,0,1) ${Number((Math.random() * 2).toFixed(1))}s`
                effectFrontLayer.appendChild(dandelionLight)
            }
            let manyDandelionChild = Math.floor(Math.random() * 3 + 5)
            for (let i = 0; i < manyDandelionChild; ++i) {
                const dandelionChild = document.createElement('div')
                dandelionChild.className = `dandelionChild`
                let dandelionChildSize = Math.floor(Math.random() * 30 + 40)
                dandelionChild.style.height = `${dandelionChildSize}px`
                dandelionChild.style.width = `${dandelionChildSize}px`
                const backgroundImage = Math.floor(Math.random() * 3 + 1)
                if (backgroundImage == 1) dandelionChild.style.backgroundImage = `url(../4DX/images/dandelionChild1.png)`
                else if (backgroundImage == 2) dandelionChild.style.backgroundImage = `url(../4DX/images/dandelionChild2.png)`
                else if (backgroundImage == 3) dandelionChild.style.backgroundImage = `url(../4DX/images/dandelionChild3.png)`
                const targetPoint = Math.random()
                let dandelionChildTargetBot = 0
                let dandelionChildTargetLeft = 0
                if (targetPoint > .5) {
                    dandelionChildTargetBot = innerHeight
                    dandelionChildTargetLeft = Math.floor(Math.random() * innerWidth)
                } else {
                    dandelionChildTargetBot = Math.floor(Math.random() * innerHeight)
                    dandelionChildTargetLeft = innerWidth
                }
                let dandelionChildBot = Math.floor(Math.random() * 170 + 130)
                let dandelionChildLeft = Math.floor(Math.random() * 170 + 30)
                dandelionChild.style.bottom = `${dandelionChildBot}px`
                dandelionChild.style.left = `${dandelionChildLeft}px`
                effectFrontLayer.appendChild(dandelionChild)
                const targetBotDistance = dandelionChildTargetBot - dandelionChildBot
                const targetLeftDistance = dandelionChildTargetLeft - dandelionChildLeft
                const targetTotalDistance = Math.abs(targetBotDistance) + Math.abs(targetLeftDistance)
                let dandelionChildRotate = 0
                let dandelionChildPeriod = 0
                const rotateDirection = Math.random()
                if (rotateDirection >= .5) dandelionChildPeriod = Number((Math.random() * 1 + .1).toFixed(2))
                else dandelionChildPeriod = -Number((Math.random() * 1 + .1).toFixed(2))
                const flyDandelionChild = setInterval(() => {
                    dandelionChildSize -= dandelionChildSize * 0.0005
                    if (dandelionChildSize < 10) dandelionChildSize = 10
                    dandelionChild.style.height = `${dandelionChildSize}px`
                    dandelionChild.style.width = `${dandelionChildSize}px`
                    dandelionChildBot += targetBotDistance * 1.5 / targetTotalDistance
                    dandelionChildLeft += targetLeftDistance * 1.5 / targetTotalDistance
                    dandelionChildRotate += dandelionChildPeriod
                    dandelionChild.style.bottom = `${Number(dandelionChildBot.toFixed(2))}px`
                    dandelionChild.style.left = `${Number(dandelionChildLeft.toFixed(2))}px`
                    dandelionChild.style.transform = `rotate(${Number(dandelionChildRotate.toFixed(2))}deg)`
                    if (Math.abs(dandelionChildTargetBot - dandelionChildBot) <= 1 || Math.abs(dandelionChildTargetLeft - dandelionChildLeft) <= 1) {
                        clearInterval(flyDandelionChild)
                        dandelionChild.parentElement.removeChild(dandelionChild)
                    }
                }, 10)
            }
        }
    }, 10)
}
controller.moveCloud = (cloud, i, direction) => {
    if (direction === 0) {
        var positionX = -(i / 2 + 1.2) * innerWidth
    } else if (direction === 1) {
        var positionX = ((i + 1) / 2 + 0.2) * innerWidth
    }
    cloud.style.left = `${positionX}px`
    effectFrontLayer.appendChild(cloud)
    model.layerDrawing = setInterval(() => {
        if (direction === 0) {
            if (innerWidth > 480) positionX += .5
            else positionX += .2
            if (positionX >= innerWidth) direction = 1
            cloud.style.left = `${Number(positionX.toFixed(1))}px`
        } else if (direction === 1) {
            if (innerWidth > 480) positionX -= .5
            else positionX -= .2
            if (positionX <= -innerWidth) direction = 0
            cloud.style.left = `${Number(positionX.toFixed(1))}px`
        }
    }, 10)
}
controller.addButton = () => {
    buttonIcon[0].onclick = () => { view.setShakeEffect() }
    buttonIcon[1].onclick = () => { view.setMoveEffect() }
    buttonIcon[2].onclick = () => { view.setTickleEffect() }
    buttonIcon[3].onclick = () => { view.setSpitEffect() }
    buttonIcon[4].onclick = () => { view.setRainEffect() }
    buttonIcon[5].onclick = () => { view.setBubleEffect() }
    buttonIcon[6].onclick = () => { view.setAirEffect() }
    buttonIcon[7].onclick = () => { view.setLightEffect() }
    buttonIcon[8].onclick = () => { view.setWindEffect() }
    buttonIcon[9].onclick = () => { view.setSmellEffect() }
    buttonIcon[10].onclick = () => { view.setFogEffect() }
}
controller.removeButton = () => {
    buttonIcon[0].onclick = () => { }
    buttonIcon[1].onclick = () => { }
    buttonIcon[2].onclick = () => { }
    buttonIcon[3].onclick = () => { }
    buttonIcon[4].onclick = () => { }
    buttonIcon[5].onclick = () => { }
    buttonIcon[6].onclick = () => { }
    buttonIcon[7].onclick = () => { }
    buttonIcon[8].onclick = () => { }
    buttonIcon[9].onclick = () => { }
    buttonIcon[10].onclick = () => { }
}


//////// model contains variable which would be reused or parameter which would be passed between functions
const model = {}
model.innerHeight = window.innerHeight
model.innerWidth = window.innerWidth
model.scrollY = window.scrollY
model.bgVideoSrc = () => {
    backgroundVideo.src = `../4DX/videos/4DX${model.bgVideoCurrentSrc}.ogg`
}
model.bgVideoCurrentSrc = 0
model.layerStyleLeft = 10
model.layerStyleTop = 20
model.layerStyleOpacity = 1
model.layerAnimation = undefined
model.windowScrollDeltaY = undefined
model.currentEffect = undefined
model.layerDrawing = undefined
model.effectWind = 0
model.clearAnimation = undefined
model.textOpacity = 1
model.changeText = undefined


////// components contains html elements or inner text
const components = {}
components.mainButton = `Với hơn 20 hiệu ứng khác nhau và đội ngũ dàn dựng chuyên nghiệp, công nghệ 4DX® tối đa hóa trải nghiệm bẳng cách thiết lập nhiều lớp cảm giác sống động, kích thích giác quan thính giác, cảm giá, khứu giác, khiến khán giả bước chân vào thế giới điện ảnh đỉnh cao, nhập vai vào chính nhân vật trong phim.`
components.shakeButton = `Hệ thống rung lắc được tích hợp dưới ghế cho ra cảm giác nhập vai vào những pha hành động gay cấn.`
components.moveButton = `Với trục chuyển động đa chiều cho ra hiệu ứng chân thật, kịch tính.`
components.tickleButton = `Các thiết bị cù lét được tích hợp ở thành ghế và ở dưới ghế ngồi sẽ hoạt động dựa vào yếu tố có trong phim, cho ra cảm giác như có vật thể thật chạm vào cơ thể khán giả.`
components.spitButton = `Thiết bị phun sương được gắn ở trước ghế ngồi của mỗi hàng ghế, ống phun sương với công nghệ hiện đại cho ra những hạt sương nano.`
components.rainButton = `Hệ thống thiết bị tạo mưa được phóng từ trong hàng ghế của khán giả, hạt mưa nhẹ, không gây ướt và khó chịu cho khán giả.`
components.bubleButton = `Bong bóng được tạo ra dựa vào các tình tiết trong phim, góp phòng tạo không khí cho phim.`
components.airButton = `Là luồng khí nhẹ, gop phần tạo không khí cảm giác cho phim.`
components.lightButton = `Hệ thống đèn được gắn xung quanh rạp sẽ xảy ra dựa vào các tình tiết diễn ra trong phim.`
components.windButton = `Máy tạo gió cho ra những cơn lốc mô phỏng, “cuốn” khán giả chìm sâu vào màn ảnh rộng.`
components.smellButton = `Mùi hương thoang thoảng được tạo góp phần đưa không khí bộ phim thăng hoa. Mùi hương được biến tấu đa dạng, đáp ứng được nhiều tình huống diễn ra trong phim.`
components.cloudButton = `Hệ thống máy tạo sương mù diễn ra tuỳ vào tình tiết và bối bảnh diễn ra trong phim.`


window.onload = () => {
    model.windowScrollDeltaY = undefined
    window.scrollTo({
        top: 0,
    })
    view.autoPlayVideo()
    playVideoBtn.onclick = () => { view.playSoundVideo() }
    backgroundVideo.onclick = () => { view.muteSoundVideo() }
    document.onwheel = e => { model.windowScrollDeltaY = e.deltaY }
    window.onresize = () => { view.muteSoundVideo() }
    document.onscroll = () => { view.windowScroll() }
    controller.addButton()
}
