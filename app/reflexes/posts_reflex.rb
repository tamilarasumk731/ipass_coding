# frozen_string_literal: true

class PostsReflex < ApplicationReflex
  include CableReady::Broadcaster
  # Add Reflex methods in this file.
  #
  # All Reflex instances expose the following properties:
  #
  #   - connection - the ActionCable connection
  #   - channel - the ActionCable channel
  #   - request - an ActionDispatch::Request proxy for the socket connection
  #   - session - the ActionDispatch::Session store for the current visitor
  #   - url - the URL of the page that triggered the reflex
  #   - element - a Hash like object that represents the HTML element that triggered the reflex
  #   - params - parameters from the element's closest form (if any)
  #
  # Example:
  #
  #   def example(argument=true)
  #     # Your logic here...
  #     # Any declared instance variables will be made available to the Rails controller and view.
  #   end
  #
  # Learn more at: https://docs.stimulusreflex.com

  def repost
    post = Post.find(element.dataset[:id])
    post.increment! :reposts_count
    cable_ready["timeline"].text_content(
      selector: "#post-#{post.id}-reposts",
      text: post.reposts_count
    )
    cable_ready.broadcast
  end
  
  def like
    post = Post.find(element.dataset[:id])
    post.increment! :likes_count
    cable_ready["timeline"].text_content(
      selector: "#post-#{post.id}-likes",
      text: post.likes_count
    )
    cable_ready.broadcast
  end
end
