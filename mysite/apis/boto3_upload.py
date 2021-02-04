
import boto3
import os


access_key = os.environ.get("ACCESS_KEY")
secret_access_key = os.environ.get("SECRET_ACCESS_KEY")
bucket_name = os.environ.get("BUCKET_NAME")
print("bucket name", bucket_name)
client = boto3.client('s3',
                      aws_access_key_id=access_key,
                      aws_secret_access_key=secret_access_key)


def upload_image(image_file):
    def generate_presigned_url(upload_file_key):
        url = client.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': bucket_name,
                'Key': upload_file_key
            }
        )
        return url
    upload_file_key = image_file
    client.upload_file(image_file, bucket_name, upload_file_key)

    return generate_presigned_url(upload_file_key)
