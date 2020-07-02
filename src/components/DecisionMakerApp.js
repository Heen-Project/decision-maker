import React from 'react'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import AddOption from './AddOption'
import OptionModal from './OptionModal'

export default class DecisionMakerApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    handleClearOptions = () => {
        this.setState(() => ({  options: [] }))
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }))
    }
    handleMakeDecision = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length)
        const decision = this.state.options[randomNumber]
        this.setState(() => ({
            selectedOption: decision
        }))
    }
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add Option!'
        } else if (this.state.options.indexOf(option)  > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => ({ 
            options: prevState.options.concat([option]) 
        }))
    }
    handleCloseModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options')
            if(json){
                const options = JSON.parse(json)
                this.setState(() => ({ options }))
            }
        } catch(e){}
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options))
        }
    }
    render() {
        const  subtitle = 'You have to make a decision and don\'t know what to choose? Decision Maker App is designed to make it easier for you to choose between the many alternatives'
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action handleMakeDecision={this.handleMakeDecision}
                    hasOptions={this.state.options.length > 0} />
                    <div className="widget">
                        <Options options={this.state.options} 
                            handleClearOptions={this.handleClearOptions}
                            handleDeleteOption={this.handleDeleteOption} />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption} 
                    handleCloseModal={this.handleCloseModal} />
            </div>
        )
    }
}