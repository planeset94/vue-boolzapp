const app = new Vue(
    {

        el: '#root',

        data: {

            me: {

                name: 'Andrea',
                avatar: '_me',
                visible: true,
            },


            counter: 0,
            newMessage: "",
            replyMessage: "Ok",
            userSearch: '',
            dropMenu: '',
            lastTimeOnline: '',
            dateInfo: '',


            contacts: [
                {
                    name: 'Matteo',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Gianbi',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },

                {
                    name: 'Marco',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Liccia',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ]




        },



        methods: {

            checkCounter(index) {
                this.counter = index;
                console.log(index);
            },



            addMessage: function (counter) {
                if (this.newMessage !== '') {
                    let day = dayjs().format('DD/MM/YYYY')
                    let hour = dayjs().format('HH:mm:ss')

                    let send = {

                        date: day + "  " + hour,
                        text: this.newMessage,
                        status: 'sent'
                    }

                    let answ = {

                        date: day + "  " + hour,
                        text: this.replyMessage,
                        status: 'received'
                    }

                    // console.log(send);
                    // console.log(answ);
                    this.contacts[counter].messages.push(send)
                    // console.log(this.contacts)
                    this.newMessage = ""

                    // AGGIUNGO LA RISPOSTA DOPO UN SECONDO
                    let v = this
                    setTimeout(function () {
                        v.contacts[counter].messages.push(answ)

                    }, 1000);

                }
            },


            activeMenu(mindex) {
                if (this.dropMenu === mindex) {
                    this.dropMenu = ""

                } else {
                    this.dropMenu = mindex
                }
                console.log(this.dropMenu)

            },

            deleteMessage(mindex) {
                console.log(this.contacts[this.counter].messages[mindex]);
                this.contacts[this.counter].messages.splice(mindex, 1);
            },

            changeTime() {
                let d = this
                setTimeout(function () {

                    let arrMess = d.contacts[d.counter].messages
                    const x = arrMess.filter(element => {
                        if (element.status === 'received') {
                            return true
                        } else {
                            return false
                        }
                    });
                    console.log(x);
                    let arrLeng = x.length
                    console.log(arrLeng)
                    if (arrLeng >= 1) {
                        d.lastTimeOnline = x[arrLeng - 1].date
                    } else {
                        d.lastTimeOnline = '.....'
                    }

                    console.log(d.lastTimeOnline);





                }, 1001);


            },

            searchContact(userSearch) {
                const searchLower = userSearch.toLowerCase();
                console.log(searchLower);
                this.contacts.forEach(contact => {
                    if (contact.name.toLowerCase().includes(searchLower)) {
                        contact.visible = true
                    } else {
                        contact.visible = false
                    }
                });

            },

        },



        mounted() {
            this.addMessage()

        },


    }


);








