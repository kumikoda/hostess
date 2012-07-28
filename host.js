var Party = Backbone.Model.extend({});
var PartyList = Backbone.Collection.extend({});

var PartyView = Backbone.View.extend({
	tagName:'tr',
	id:'party-view',
	className:'party',
	
	render: function() {
		var name =this.model.get('name');
		var size = this.model.get('size');
		var time = this.model.get('time');
		var html =  "<td>" + name + "</td>"
					+ "<td>" + size + "</td>"
					+ "<td>" + time + "</td>";
					
		this.$el.html(html);
		return this;
	}
});

var PartyListView = Backbone.View.extend({
	tagName: 'tbody',
	el:$('#party-list'),

	initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.addAll, this);
	},
	
	render: function() {
		this.addAll();
		return this;
	},
	
	addAll: function() {
		this.collection.forEach(this.addOne, this);
	},
	
	addOne: function(party){
		var partyView = new PartyView({model:party});
		this.$el.append(partyView.render().el);
	}

});

var AppView = new (Backbone.View.extend({
	el: $("#hostapp"),
	
	events: {
      "click button":  "newParty"
    },
	
	initialize: function(){
		this.partyList = new PartyList();
		this.partyListView = new PartyListView({collection:this.partyList});
	},
	
	newParty: function(e){
		e.preventDefault();
		size = $('#size').val();
		name = $('#name').val();
		number = $('#number').val();
		this.partyList.add(new Party({name:name, size:size, number:number}));
	},
	
	test: function() {
		this.partyList.reset([{name:"anson",size:4,time:"10-15"}, {name:"matthew",size:3,time:"3-5"}]);
	},
	
	addTest: function() {
		this.partyList.add(new Party({name:"peter", size:1,time:'10-15'		}))
	}
}));


$(function() {


});