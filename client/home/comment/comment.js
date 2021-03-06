Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY'
});


Template.comment.commentComment = function(){
  return Comments.find({parent:this._id});
};

Template.commentComment = function(){
  return Comments.find({parent:null}, {sort:{Cyes:-1, Cno:1, date:-1}});
  //find and sort by date
};
//

Template.comment.events({
  'keyup .comments':function(evnt, templ){
    if(evnt.which === 13){
      // 13 is the char number for enter
      var commentNote = templ.find('.comments').value;
      console.log(commentNote);
      var options = {text:commentNote, parent:this._id};
      Meteor.call('addComment', options);
      //inserts comment into DB with text, userId, a new date and post/comments
      $('.comments').val("").select().focus();
    }
  }
});

Template.comment.events({
  'click': function () {
    Session.set("selected_vote", this._id);
  },
  'click a.yes' : function(e) {
    e.preventDefault();
    var commentId = Session.get('selected_vote');
    console.log('updating yes count for commentId '+commentId);
    Meteor.call("incrementYesVotes",commentId);
  },
  'click a.no': function(e) {
    e.preventDefault();
    var commentId = Session.get('selected_vote');
    console.log('updating no count for commentId '+commentId);
    Meteor.call("incrementNoVotes",commentId);
  }
});


Template.commentcomment.events({
  'click': function () {
    Session.set("selected_comment_vote", this._id);
  },
  'click a.yes' : function(e) {
    e.preventDefault();
    var commentcommentId = Session.get('selected_comment_vote');
    console.log('updating yes count for commentcommentId '+commentcommentId);
    Meteor.call("incrementCommentYesVotes",commentcommentId);
  },
  'click a.no': function(e) {
    e.preventDefault();
    var commentcommentId = Session.get('selected_comment_vote');
    console.log('updating no count for commentcommentId '+commentcommentId);
    Meteor.call("incrementCommentNoVotes",commentcommentId);
  }
});
