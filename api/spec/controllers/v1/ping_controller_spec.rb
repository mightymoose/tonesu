describe V1::PingController do
  subject { get :index, format: :json } 

  it { is_expected.to have_http_status(:ok) }
end