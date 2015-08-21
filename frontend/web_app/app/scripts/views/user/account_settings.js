/**
 * Copyright (c) 2014-present James Adam.  All rights reserved.
 *
 * This file is part of WikiFeat
 *
 *     WikiFeat is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 *     WikiFeat is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 * along with WikiFeat.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Created by jcadam on 8/5/15.
 */

'use strict';
define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.radio',
    'bootstrap',
    'views/user/edit_user_dialog',
    'views/user/change_password_dialog',
    'views/user/edit_user_avatar',
    'views/main/error_dialog',
    'text!templates/user/account_settings.html',
    'entities/user/user',
    'entities/user/user_avatar',
    'entities/error'
], function($,_,Marionette,Radio,Bootstrap,EditUserDialog,
            ChangePasswordDialogView,EditUserAvatarView,
            ErrorDialog, AccountSettingsTemplate, UserModel,
            UserAvatarModel, ErrorModel){

    return Marionette.ItemView.extend({
        className: "account-settings-view",
        model: UserModel,
        template: _.template(AccountSettingsTemplate),
        events: {
            'click #editProfileButton': 'editProfile',
            'click #changePasswordButton': 'changePassword',
            'click #changePictureButton': 'changePicture'
        },

        initialize: function(){
            this.model.on('change', this.render, this);
        },

        editProfile: function(event){
            var editUserDialog = new EditUserDialog({model: this.model});
            Radio.channel('main').trigger('show:dialog', editUserDialog);
        },

        changePassword: function(event){
            var cpv = new ChangePasswordDialogView({model: this.model});
            Radio.channel('main').trigger('show:dialog', cpv);
        },

        changePicture: function(event){
            Radio.channel('userManager').request('get:avatar', this.model.id)
                .done(function(response){
                    if(typeof response === 'undefined')    {
                        var errorDialog = new ErrorDialog({
                            model: new ErrorModel({
                                errorTitle: "Error loading avatar",
                                errorMessage: "Could not load avatar"
                            })
                        });
                        Radio.channel('main').trigger('show:dialog', errorDialog);
                    } else {
                        var euv = new EditUserAvatarView({model: response});
                        Radio.channel('main').trigger('show:dialog', euv);
                    }
                });
        },

        onRender: function(){
            if(typeof this.model !== 'undefined'){
                var userPublic = this.model.get("userPublic");
                var fullName = userPublic.firstName + " " + userPublic.lastName;
                var title = userPublic.title;
                var email = userPublic.contactInfo.email;
                //var eh = MD5(email);
                var avatar = new UserAvatarModel({},{userId: this.model.id});
                //this.$("#pictureWrapper").html(
                //    '<img src="https://www.gravatar.com/avatar/' + eh + '?s=200"/>'
                //);
                this.$("#pictureWrapper").html(this.model.getAvatar());

                this.$("#nameField").html(fullName);
                this.$("#userNameField").html('<span class="glyphicon glyphicon-user"></span>&nbsp;' +
                    this.model.get("name"));
                this.$("#emailField").html('<span class="glyphicon glyphicon-envelope"></span>&nbsp;' +
                    '<a href="mailto:' + email + '">' + email + '</a>');
                this.$("#titleField").html('<span class="glyphicon glyphicon-briefcase"></span>&nbsp;' + title);
            }
        },

        onClose: function(){
        }

    });

});
