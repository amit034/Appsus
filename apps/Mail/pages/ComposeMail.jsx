import { mailService } from '../services/mail-service'
import { utilService } from '../../../services/util-service.js'


export class ComposeMail extends React.Component {
    state = {
        to: "",
        cc: "",
        subject: "",
        message: ""
    }

    clearFields = () => {
        this.setState({ to: "", cc: "", subject: "", message: "" })
        alert('cleared')
    }

    hundleChange = (ev) => {
        const prop = ev.target.name;
        const val = ev.target.value;
        this.setState({ [prop]: val })
    }

    onSendMail = (ev) => {
        ev.preventDefault();
        const newSentMail = {
            to: this.state.to,
            subject: this.state.subject,
            message: this.state.message,
            id: utilService.makeId(),
            type: 'outMails'
        }
        mailService.saveItem(newSentMail)
        this.clearFields()
        this.props.toggleIsCompose()
    }


    render() {

        return (
            <section className="compose-page flex" >
                <form className="compose-form flex column" onSubmit={this.onSendMail}>
                    <button onClick={() => this.props.toggleIsCompose()}>X</button>
                    <div className="compose-header">New Message</div>
                    <input type="email" name='to' placeholder="To:" required value={this.state.to} onChange={this.hundleChange} />
                    <input type="text" name='cc' placeholder="cc:" value={this.state.cc} onChange={this.hundleChange} />
                    <input type="text" name='subject' placeholder="subject:" required value={this.state.subject} onChange={this.hundleChange} />
                    <textarea rows='30' name='message' required value={this.state.message} onChange={this.hundleChange} ></textarea>
                    <button >Send</button>
                </form>

            </section>

        )

    }

}