class Api::NewsController < ApplicationController
  def index
    render json: HTTParty.get(
      "http://newsapi.org/v2/everything?apiKey=14e9caba8b9042d5bfa38bcf6bea13b7" +
      "&q=#{CGI.escape(params[:q])}&language=en&pageSize=30" +
      "&sources=bloomberg,business-insider,cnbc,cnn,fortune,reuters," +
      "the-new-york-times,the-wall-street-journal"
    ).parsed_response["articles"].uniq { |article| article["title"] }
  end
end
