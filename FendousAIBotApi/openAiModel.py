import os
import openai
import time


def getModelResponse(query):
    openai.api_key = os.getenv("OPENAI_KEY")

    assistant_id = "asst_XcN7ghpfUdJ6mSt3BPGgSA6l"  # Assistant's ID

    # Create a new thread
    thread = openai.beta.threads.create()
    thread_id = thread.id

    # Add the user's query to the thread
    openai.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=query  # User input is used here
    )

    # Run the Assistant
    run = openai.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant_id
    )

    run_id = run.id  # Access ID with dot notation

    # Wait for the Assistant to complete processing
    while True:
        run_status = openai.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
        if run_status.status in ["completed", "failed"]:  # Use dot notation
            break
        time.sleep(1)  # Wait before checking again

    # Retrieve the Assistant's response
    messages = openai.beta.threads.messages.list(thread_id=thread_id)

    # Display the response from the assistant
    for message in reversed(messages.data):
        if message.role == "assistant":
            return f"{message.content}"
