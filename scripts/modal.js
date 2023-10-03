class Modal {
    constructor(elem) {
        this.modal = elem;
    }
    show() {
        overlay.style.display = "block";
        this.modal.style.display = "block";
        overlay.animate({
            opacity: [0, 1]
        }, {
            duration: 200,
            fill: "forwards"
        });
        this.modal.animate({
            top: ['-50%', '50%']
        }, {
            duration: 300,
            fill: "forwards",
            delay: 200
        });
    }
    hide() {
        this.modal.animate({
            top: ['50%', '-50%']
        }, {
            duration: 300,
            fill: "forwards"
        });
        overlay.animate({
            opacity: [1, 0]
        }, {
            duration: 200,
            fill: "forwards",
            delay: 300
        });
        setTimeout(() => {
            overlay.style.display = "none";
            this.modal.style.display = "none";
        }, 500);
    }
}
const edit_alarm_modal = new Modal(edit_modal),
    play_alarm_modal = new Modal(play_modal);