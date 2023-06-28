class Achievement {
    constructor(name, description, handler) {
        this.name = name;
        this.description = description;
        this.handler = handler;
        this.jqElement = null
        this.createNotif()
    }

    isAchieve(){
        return this.handler()
    }

    createNotif(){
        const html = `<div class="notif">
                        <div class="croixEtTexte">
                            <p>Vous avez réussi un succès !</p>
                            <p class="success">${this.description}</p>
                            <div class="cross">
                                <i class="fa-solid fa-x"></i>
                            </div>
                        </div>
                     </div>`
        this.jqElement = jQuery(html)

        this.jqElement.find(".cross").on("click", () => {this.closeModal()});

        setTimeout(() => {this.closeModal()} ,10000)

    }

    closeModal(){
        this.jqElement.fadeOut(250);
    }

}