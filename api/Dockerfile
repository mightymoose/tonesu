FROM ruby:2.6.6

WORKDIR /tonesu
ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

COPY Gemfile /tonesu
COPY Gemfile.lock /tonesu
RUN bundle config --global frozen 1
RUN bundle install --without development test

COPY . /tonesu

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]