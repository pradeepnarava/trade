class Api::StocksController < ApplicationController
  before_action :require_log_in

  def show
    puts "symbol charts................"
     symbol = params[:symbol].upcase
     @stock = Stock.info(symbol)
     puts "symbol charts................"
    if @stock
      @shares_of = current_user.shares_of(symbol)
    else
      render plain: "Stock not found", status: 404
    end
  end

  def week
    symbol = params[:symbol].upcase
    @stock = Stock.detailed_week_chart(symbol)
    if @stock
      render json: @stock
    else
      render plain: "Stock not found", status: 404
    end
  end
end
