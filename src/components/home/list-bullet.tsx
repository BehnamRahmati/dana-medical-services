export default function ListBullet({ step }: { step: number }) {
	const renderingRings = () => {
		switch (step) {
			case 1:
				return (
					<div>
						<div className='size-5 bg-ring rounded-full absolute top-0 right-0 trnasform translate-1/2'></div>

						<div
							className='size-12 border border-ring rounded-full absolute -top-7 right-0 animate-spin tranasform translate-1/2'
							style={{ animationDuration: '2s' }}
						>
							<div className='relative'>
								<div className='size-2 bg-ring rounded-full absolute -bottom-4 right-0'></div>
							</div>
						</div>

						<div className='w-1 h-30 bg-ring rounded-full absolute top-13 -right-0.5'></div>
					</div>
				)

			case 2:
				return (
					<div>
						<div className='size-5 bg-ring rounded-full absolute top-0 right-0 trnasform translate-1/2'></div>

						<div
							className='size-12 border border-ring rounded-full absolute -top-7 right-0 animate-spin tranasform translate-1/2'
							style={{ animationDuration: '2s' }}
						>
							<div className='relative'>
								<div className='size-2 bg-ring rounded-full absolute -bottom-4 right-0'></div>
							</div>
						</div>

						<div
							className='size-20 border border-ring rounded-full absolute -top-15 right-0 animate-spin tranasform translate-1/2'
							style={{ animationDuration: '3s' }}
						>
							<div className='relative'>
								<div className='size-2 bg-ring rounded-full absolute -bottom-6 right-0'></div>
							</div>
						</div>

						<div className='w-1 h-22 bg-ring rounded-full absolute top-17 -right-0.5'></div>
					</div>
				)

			case 3:
				return (
					<div>
						<div className='size-5 bg-ring rounded-full absolute top-0 right-0 trnasform translate-1/2'></div>

						<div
							className='size-12 border border-ring rounded-full absolute -top-7 right-0 animate-spin tranasform translate-1/2'
							style={{ animationDuration: '2s' }}
						>
							<div className='relative'>
								<div className='size-2 bg-ring rounded-full absolute -bottom-4 right-0'></div>
							</div>
						</div>

						<div
							className='size-20 border border-ring rounded-full absolute -top-15 right-0 animate-spin tranasform translate-1/2'
							style={{ animationDuration: '3s' }}
						>
							<div className='relative'>
								<div className='size-2 bg-ring rounded-full absolute -bottom-6 right-0'></div>
							</div>
						</div>

						<div
							className='size-28 border border-ring rounded-full absolute -top-23 right-0 animate-spin tranasform translate-1/2'
							style={{ animationDuration: '5s' }}
						>
							<div className='relative'>
								<div className='size-2 bg-ring rounded-full absolute -bottom-10 right-0'></div>
							</div>
						</div>
					</div>
				)

			default:
				return (
					<div>
						<div className='size-5 bg-ring rounded-full absolute top-0 right-0 trnasform translate-1/2'></div>
						<div className='w-1 h-32 bg-ring rounded-full absolute top-9 -right-0.5'></div>
					</div>
				)
		}
	}
	return <div>{renderingRings()}</div>
}
