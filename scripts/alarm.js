class Alarm {
    constructor(name, time) {
        this._name = name;
        this.time = time;
        this.time_str = time;
        this.snooze_count = 0;
    }
    set name(val) {
        this._name = val;
        if (this.container) this.container.children[0].innerText = this._name;
    }
    set time(val) {
        this.time_str = val;
        if (this.timer) clearTimeout(this.timer);
        let current_time = new Date();
        let t = val.split(':');
        this._time = new Date(current_time.getFullYear(), current_time.getMonth(), current_time.getDate(), parseInt(t[0]), parseInt(t[1]), 0);
        this.timer = setTimeout(() => playAlarm(this), this._time - current_time.getTime());
    }
    get name() {
        return this._name;
    }
    get time() {
        return this.time_str;
    }
    render() {
        let holder = alarm_box_template.content.cloneNode(true);
        this.container = holder.children[0];
        let $ = this.container.children;
        $[0].innerText = this._name;
        $[1].innerText = this.time_str;
        $[2].children[0].onclick = () => editAlarm(this);
        $[2].children[1].onclick = () => deleteAlarm(this);
        this.container.onpointerover = () => this.container.title = "3 minutes to go";
        alarm_container.insertBefore(holder, add_alarm_btn);
    }
    destroy() {
        clearTimeout(this.timer);
        this.container.animate({
            opacity: [1, 0]
        }, {
            duration: 200,
            fill: "forwards"
        });
        setTimeout(() => this.container.remove(), 200);
    }
    snooze() {
        if (this.snooze_count++ == 5) {
            this.destroy();
            return;
        }
        clearTimeout(this.timer);
        this._time = new Date(this._time.getTime() + 5000);
        this.time_str = this._time.getHours() + ":" + this._time.getMinutes();
        this.timer = setTimeout(() => playAlarm(this), 5000);
        this.container.children[1].innerText = this.time_str;
    }
    dismiss() {
        alert("Alarm dismissed!");
        this.destroy();
    }
}

function newAlarm() {
    edit_modal.alarm = null;
    edit_modal.children[0].innerText = "New alarm";
    let date = new Date();
    edit_modal.children[1].children[0].value = `${date.getHours()}:${date.getMinutes() + 1}`;
    edit_alarm_modal.show();
}

function saveAlarm() {
    if (edit_modal.alarm) {
        edit_modal.alarm.name = alarm_name_edit.value;
        edit_modal.alarm.time = alarm_time_edit.value;
        edit_modal.alarm.render();
    } else {
        let alarm = new Alarm(alarm_name_edit.value, alarm_time_edit.value);
        alarm.render();
    }
    edit_alarm_modal.hide();
}

function editAlarm(alarm) {
    edit_modal.alarm = alarm;
    edit_modal.children[0].innerText = "Edit alarm - " + alarm.name;
    edit_modal.children[1].children[0].value = alarm.time;
    edit_alarm_modal.show();
}

function deleteAlarm(alarm) {
    if (confirm(`Delete the alarm ${alarm.name}?`)) alarm.destroy();
}

function playAlarm(alarm) {
    play_modal.alarm = alarm;
    play_modal.children[0].innerText = alarm.name;
    play_modal.children[1].children[0].innerText = alarm.time;
    play_alarm_modal.show();
}

function snoozeAlarm(e) {
    e.parentElement.parentElement.alarm.snooze();
    play_alarm_modal.hide();
}

function dismissAlarm(e) {
    e.parentElement.parentElement.alarm.dismiss();
    play_alarm_modal.hide();
}

function updateTime() {
    let date = new Date();
    let time_str = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    clock.innerText = time_str;
}
updateTime();
setInterval(updateTime, 1000);