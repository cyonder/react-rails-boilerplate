class Api::V1::UsersController < Api::V1::BaseController
    before_action :authenticate_request, except: [:create]

    def index
        respond_with User.all
    end

    def create
        respond_with :api, :v1, User.create(user_params), location: nil
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end
