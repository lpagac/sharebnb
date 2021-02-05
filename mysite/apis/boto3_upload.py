
import boto3
import os
from secrets import ACCESS_KEY, SECRET_ACCESS_KEY, BUCKET_NAME
client = boto3.client('s3',
                      aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_ACCESS_KEY)


def upload_image(image_file):
    def generate_presigned_url(upload_file_key):
        url = client.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': upload_file_key
            }
        )
        return url
    upload_file_key = image_file
    client.upload_file(image_file, BUCKET_NAME, upload_file_key)

    return generate_presigned_url(upload_file_key)
